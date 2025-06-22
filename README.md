# playwright-release

A CLI tool that fetches, parses, and displays Playwright release notes from the official repository.

## Features

- Fetches Playwright release notes in Markdown format.
- Parses Markdown string to extract release sections and information.
- Outputs structured release data via terminal GUI.

## Usage

### Using shell alias

1. build the application:

   ```sh
   pnpm install
   pnpm build
   ```

2. open your shell configuration file (e.g., `~/.bashrc`, `~/.zshrc`) and add the following alias:

   ```sh
   alias pr="node ~/path/to/playwright-release/dist/index.js"
   ```

3. reload your shell configuration:

   ```sh
   source ~/.bashrc
   ```

4. then use the alias:

   ```sh
   pr
   ```

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
