# Publish Your .NET Library with NuGet

## What is NuGet?

[NuGet](https://www.nuget.org/) is a package manager for .NET platform. By using NuGet tools, we can easilly install and publish libraries. In this article, I'm going to talk about how to initialize a .NET class library with Test Driven Development (TDD) and how to set up [Github Actions](https://docs.github.com/en/actions) to achieve Continuous Integration (CI) & Continuous Deployment (CD).

## Prerequisites.

1. First, we should make sure that [.NET Core SDK](https://dotnet.microsoft.com/download/) has been sucessfully installed on our machine.
2. And we need to register a free account on [nuget.org](https://www.nuget.org/).

## Initialize .NET class library.

Now, we use dotnet CLI to **create a class library project**.

```bash
dotnet new classlib -o SomeProject && cd SomeProject
```

Then, we should **add package metadata** to the project file (`SomeProject/SomeProject.csproj`).

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>netstandard2.0</TargetFramework>
    
    <PackageId>SomeProject</PackageId>
    <Description>A sample .NET library</Description>
    <Authors>Grey Wang</Authors>
    <RepositoryUrl>https://github.com/aguang-xyz/some-project-dotnet</RepositoryUrl>
    <PackageLicenseExpression>MIT</PackageLicenseExpression>
    
    <EnableDefaultCompileItems>false</EnableDefaultCompileItems>
  </PropertyGroup>
	
  <ItemGroup>
    <Compile Include="SomeProject.cs" />
  </ItemGroup>
</Project>

```

* `PackageId` is the slug of your project showing on [nuget.org](https://www.nuget.org/).
* `Description` indicates a text descriping your project.
* `Authors` indicates the list of authors' names (comma separated).
* `RepositoryUrl` is the url of the home page of your project.
* `PackageLicenseExpression` indicates the license of your project. And we can also use [PackageLicenseFile](https://docs.microsoft.com/en-us/dotnet/core/tools/csproj#packagelicensefile) or [PackageLicenseUrl](https://docs.microsoft.com/en-us/dotnet/core/tools/csproj#packagelicenseurl) to indicate the license.
* Setting `EnableDefaultCompileItems` to `false` and adding a `Compile/Include` option indicate that the compiler will not import all source files automatically. Because we will create a subfolder as a test project later.

## Initialize test project.

To make sure the reliability of your implementation, we should also **add a test project** to cover the functionalities. There are serveral choices of unit test frameworks in .NET platform ([xUnit](https://xunit.net/), [NUnit](https://nunit.org/), [MSTest](https://docs.microsoft.com/en-us/dotnet/api/microsoft.visualstudio.testtools.unittesting?view=mstest-net-1.3.2)) to setup our test project.

```{bash}
dotnet new mstest -o SomeProjectTest
```

Since the main project will be used by the test project, we should make a reference from main project to test project.

```{bash}
dotnet add SomeProjectTest/SomeProjectTest.csproj reference SomeProject.csproj
```

## Development.

In this sample, we plant to implement a very simple class called `SomeCounter`. It contains only a method `AddAndGet`. Every time you call this method, it should increment the counter and return value after incrementation.

Here is the **test code** (`SomeProjectTest/SomeProjectTest.cs`).

```cs
using Microsoft.VisualStudio.TestTools.UnitTesting;
using SomeProject;

namespace SomeProjectTest
{
    [TestClass]
    public class SomeProjectTest
    {
        [TestMethod]
        public void TestCounter()
        {
            var counter = new SomeCounter();

            Assert.AreEqual(1, counter.AddAndGet());
        }
    }
}
```

Here is the **source code** (`SomeProject.cs`):

```cs
namespace SomeProject
{
    public class SomeCounter
    {
        private int count = 0;
      
        public int AddAndGet()
        {
            return ++count;
        }
    }
}
```

## Run the unit tests.

Now we can **run the test cases** to check the correcness of our code. By using the additional parameter `logger`, the **logs** (if we have) can be displayed on the terminal.

```{bash}
dotnet test --logger "console;verbosity=detailed" SomeProjectTest
```

## Initialize Git repository.

Now we **initialize the git repository**.

```bash
git init
```

To **ignore the build output**, we should create a `.gitignore` first.

```text
bin/
obj/
```

We **commit the changes**.

```bash
git add -A
git commit -m "Initialize SomeProject."
```

And we **create a tag**, the tag will used as the version in the next step.

```bash
git tag -a v1.0.0
```

## Build & publish the NuGet package manually.

Now we can start to **build the NuGet package** by running the command above. After execution, we should find a NuGet package file (`bin/Debug/SomeProject.1.0.0.nupkg`).

In this command, we take `${"$(git describe --tags --abbrev=0)":1}` to read the latest git tag (`v1.0.0`), skip the first character ('v') and use the rest ("1.0.0") as the **automatic package version**.

```bash
dotnet pack -p:PackageVersion=${"$(git describe --tags --abbrev=0)":1}
```

To **publish the NuGet package**, we should prepare for the API key first. It can be created via NuGet's dashboard. And the we can run the following command to publish the package manually. **HINT: Due to Microsoft's security strategy, it may take hours to do the [package validation and indexing](https://docs.microsoft.com/en-us/nuget/nuget-org/publish-a-package#package-validation-and-indexing)**. 

```bash
dotnet nuget push ./bin/Debug/SomeProject.1.0.0.nupkg \
  --api-key {API_KEY} \
  --source https://api.nuget.org/v3/index.json
```

## CI & CD workflow.

Now we want to combine the previous several steps (run test cases, build and deploy) together to setup up a Continuious Integration (CI) & Continuous Deployment (CD) workflow based Github actions. The above yaml file (`.github/workflows/build-dotnet.yml`) is an example to show how the CI & CD action works.

```yaml
name: build/dotnet

on: [push, pull_request]

jobs:
  release:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout Git repository.
        uses: actions/checkout@v1
        
      - name: Set up dotnet CLI.
        uses: actions/setup-dotnet@v1
        with:
          dotnet-version: 3.1.302
          
      - name: Run unit tests.
        run: |
          dotnet test --logger "console;verbosity=detailed" SomeProjectTest
        
      - name: Build a NuGet package.
        if: github.event_name == 'push' && startsWith(github.ref, 'refs/tags')
        run: |
          dotnet pack -p:PackageVersion=${GITHUB_REF#refs/tags/v}
        
      - name: Publish the NuGet packge.
        if: github.event_name == 'push' && startsWith(github.ref, 'refs/tags')
        run: |
          dotnet nuget push ./bin/Debug/SomeProject.*.nupkg \
            --api-key ${API_KEY} \
            --source https://api.nuget.org/v3/index.json
        env:
          API_KEY: ${{secrets.NUGET_API_KEY}}
```

We need to config a secret key `NUGET_API_KEY` via the Github dashboard. Then, every time after we push commits or submit a pull request, we will see if all the test cases can be passed. And after each time we push a new tag, it will build a NuGet package and deploy to [nuget.org](https://www.nuget.org/) automatically.

## References.

* [Create .NET apps faster with NuGet](https://www.nuget.org/).
* [Github Actions Document](https://docs.github.com/en/actions).
* [Download .NET Core 3.1](https://dotnet.microsoft.com/download/).
* [Additions to the csproj format for .NET Core](https://docs.microsoft.com/en-us/dotnet/core/tools/csproj).
* [Abount xUnit.net](https://xunit.net/).
* [What Is NUnit?](https://nunit.org/).
* [MSTest Test Framework 1.3.2](https://docs.microsoft.com/en-us/dotnet/api/microsoft.visualstudio.testtools.unittesting?view=mstest-net-1.3.2).
* [Package validation and indexing of NuGet platform](https://docs.microsoft.com/en-us/nuget/nuget-org/publish-a-package#package-validation-and-indexing).


