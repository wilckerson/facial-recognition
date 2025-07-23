# Use the official .NET 9 SDK image for development
FROM mcr.microsoft.com/dotnet/sdk:9.0

# Set the working directory
WORKDIR /app

# Install dotnet-ef tool for database migrations (if needed)
RUN dotnet tool install --global dotnet-ef
ENV PATH="$PATH:/root/.dotnet/tools"

# Copy the project file and restore dependencies
COPY FacialRecognition.csproj ./
RUN dotnet restore

# Copy the source code
COPY . ./

# Expose the port the app runs on
EXPOSE 8080

# Define the entry point using dotnet watch for hot reloading
ENTRYPOINT ["dotnet", "watch", "run", "--project", "FacialRecognition.csproj", "--urls", "http://0.0.0.0:8080"]
