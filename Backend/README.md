# Name Drawer API - Backend

ASP.NET Core Web API for managing and randomly drawing names.

## Prerequisites

- .NET 8.0 SDK
- SQL Server (or SQL Server running in Docker on Linux)

## Setup on Debian Server

### 1. Install SQL Server on Debian using Docker

```bash
# Pull SQL Server Docker image
docker pull mcr.microsoft.com/mssql/server:2022-latest

# Run SQL Server container
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=YourStrong@Password123" \
   -p 1433:1433 --name namedrawer-mssql \
   -d mcr.microsoft.com/mssql/server:2022-latest
```

### 2. Install .NET 8.0 on Debian

```bash
# Add Microsoft package repository
wget https://packages.microsoft.com/config/debian/12/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
rm packages-microsoft-prod.deb

# Install .NET SDK
sudo apt-get update
sudo apt-get install -y dotnet-sdk-8.0
```

### 3. Configure the Application

Update the connection string in `appsettings.json`:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=NameDrawerDb;User Id=sa;Password=YourStrong@Password123;TrustServerCertificate=True;"
}
```

### 4. Build and Run

```bash
# Restore dependencies
dotnet restore

# Build the project
dotnet build

# Run the application
dotnet run
```

The API will be available at `http://localhost:5000`

## API Endpoints

- `GET /api/names` - Get all names
- `GET /api/names/{id}` - Get a specific name
- `POST /api/names` - Add a new name
  ```json
  {
    "fullName": "John Doe"
  }
  ```
- `GET /api/names/random` - Draw a random name
- `DELETE /api/names/{id}` - Delete a specific name
- `DELETE /api/names` - Delete all names

## Swagger Documentation

When running in development mode, access Swagger UI at: `http://localhost:5000/swagger`

## Production Deployment

For production deployment, publish the application:

```bash
dotnet publish -c Release -o ./publish
```

Then copy the `publish` folder to your Debian server and run:

```bash
cd publish
dotnet NameDrawer.Api.dll
```

Consider using systemd service for automatic startup and process management.
