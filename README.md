# playwright-release

A CLI tool that fetches, parses, and displays the latest Playwright release notes from the official repository.

## Features

- Fetches the latest Playwright release notes in Markdown format.
- Parses Markdown to extract release sections and information.
- Outputs structured release data for further processing or display.

## Usage

### Development

```sh
pnpm install
pnpm dev
```

### Build

```sh
pnpm build
```

## Scripts

- `dev`: Run the app in development mode using tsx.
- `build`: Compile TypeScript to JavaScript in the `dist` directory.
- `type-check`: Run TypeScript type checking.
- `lint`: Lint the codebase with ESLint.

## Project Structure

- `src/api.ts`: Fetches Markdown from the Playwright repository.
- `src/parser.ts`: Parses Markdown and converts it to JSON.
- `src/client.ts`: Handles displaying or using the parsed data.
- `src/index.ts`: Main entry point, orchestrates fetching, parsing, and output.

## License

MIT
