# File Processor Application

This is a Node.js application that processes text files and DOCX files, either from a local path or a URL. It analyzes the content to provide statistics such as word count, letter count, space count, and frequently occurring words. The application is built using TypeScript and follows best practices for code organization and design patterns.

## Features

- **File Reading**: Supports reading files from local paths or URLs.
- **Content Analysis**: Computes word count, letter count, space count, and identifies frequently occurring words.
- **Design Pattern**: Utilizes the Singleton design pattern for the `FileProcessor` class.

## Requirements

- **Node.js**: Version 18.x or later
- **Docker** (Optional): For containerization

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/your-repository.git
   cd your-repository
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

## Usage

You can run the application using `npm run dev` or directly with Node.js. The application will prompt you for a file path or URL to analyze.

### Running the Application

1. **Start the Application:**

   ```bash
   npm run dev
   ```

2. **Input:**

   Enter the local path or public URL of the file you want to analyze. Supported file formats are `.txt` and `.docx`.

3. **Output:**

   The application will output:

   - Total word count
   - Total letter count
   - Total space count
   - Words that occur more than 10 times along with their frequencies

## Docker

To run the application in a Docker container, you can use the provided Dockerfile.

### Building the Docker Image

```bash
docker build -t file-processor .
```

### Running the Docker Container

```bash
docker run -it --rm file-processor
```

## Design Pattern

The application uses the Singleton Pattern for the FileProcessor class, ensuring that only one instance of this class is created throughout the application's lifecycle.

## Testing

```bash
npm run test
```
