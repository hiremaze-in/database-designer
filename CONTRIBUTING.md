# Contributing to Database Schema Designer

Thank you for your interest in contributing to Database Schema Designer! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Submitting Changes](#submitting-changes)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors. We expect:

- Respectful communication
- Constructive feedback
- Focus on what's best for the project
- Empathy towards other contributors

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18 or higher
- npm or yarn
- Git

### Setting Up Your Development Environment

1. **Fork the repository** on GitHub

2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/project.git
   cd project
   ```

3. **Add the upstream repository**:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/project.git
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

6. **Open your browser** to `http://localhost:5173`

## Development Workflow

### Creating a Branch

Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding or updating tests
- `chore/` - Maintenance tasks

### Making Changes

1. Make your changes in your feature branch
2. Test your changes thoroughly
3. Ensure the code follows our coding standards
4. Run the linter: `npm run lint`
5. Run the type checker: `npm run typecheck`
6. Build the project: `npm run build`

### Keeping Your Fork Updated

Regularly sync your fork with the upstream repository:

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

## Project Structure

```
src/
├── components/       # React components
│   ├── Canvas.tsx   # Main canvas component
│   ├── TableNode.tsx # Table node component
│   ├── Sidebar.tsx  # Sidebar component
│   └── Toolbar.tsx  # Toolbar component
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── App.tsx          # Main app component
└── main.tsx         # Entry point
```

### Key Files

- **src/types/schema.ts**: Core type definitions for tables, columns, and relationships
- **src/components/Canvas.tsx**: Handles the canvas rendering and relationship line drawing
- **src/components/TableNode.tsx**: Individual table component with column management
- **src/utils/storage.ts**: Local storage management
- **src/utils/markdown.ts**: Markdown export functionality

## Coding Standards

### TypeScript

- Use TypeScript for all new files
- Define proper types and interfaces
- Avoid using `any` type unless absolutely necessary
- Use meaningful variable and function names

### React

- Use functional components with hooks
- Keep components small and focused
- Use proper prop types
- Follow the single responsibility principle

### Code Style

- Use 2 spaces for indentation
- Use single quotes for strings
- Add semicolons at the end of statements
- Follow the existing code style in the project

### Example

```typescript
// Good
interface TableProps {
  table: Table;
  onUpdate: (table: Table) => void;
}

export const TableComponent: React.FC<TableProps> = ({ table, onUpdate }) => {
  const handleChange = (name: string) => {
    onUpdate({ ...table, name });
  };

  return (
    <div className="table-container">
      {/* Component JSX */}
    </div>
  );
};

// Avoid
const TableComponent = (props: any) => {
  // Implementation
};
```

### CSS/Styling

- Use Tailwind CSS utility classes
- Keep custom CSS to a minimum
- Follow mobile-first responsive design
- Use semantic class names when custom CSS is needed

## Submitting Changes

### Commit Messages

Write clear, descriptive commit messages:

```bash
# Good
git commit -m "feat: add relationship type selector to FK configuration"
git commit -m "fix: resolve connection line positioning for nested tables"
git commit -m "docs: update README with new relationship features"

# Format
<type>: <description>

Types: feat, fix, docs, style, refactor, test, chore
```

### Pull Request Process

1. **Update your branch** with the latest changes from upstream:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Push your changes** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create a Pull Request** on GitHub:
   - Use a clear, descriptive title
   - Provide a detailed description of your changes
   - Reference any related issues
   - Include screenshots for UI changes
   - Ensure all checks pass

4. **PR Description Template**:
   ```markdown
   ## Description
   Brief description of what this PR does

   ## Related Issue
   Fixes #issue_number

   ## Changes Made
   - Change 1
   - Change 2

   ## Screenshots (if applicable)
   [Add screenshots here]

   ## Checklist
   - [ ] Code follows project style guidelines
   - [ ] Tests added/updated
   - [ ] Documentation updated
   - [ ] All tests passing
   - [ ] TypeScript compiles without errors
   ```

5. **Respond to feedback** from reviewers promptly

6. **After approval**, a maintainer will merge your PR

## Reporting Bugs

### Before Submitting a Bug Report

- Check the existing issues to avoid duplicates
- Verify the bug exists in the latest version
- Collect relevant information about your environment

### Submitting a Bug Report

Create an issue with the following information:

**Title**: Clear, concise description of the bug

**Description**:
```markdown
## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Environment
- Browser: [e.g., Chrome 120]
- OS: [e.g., Windows 11]
- Version: [e.g., 1.0.0]

## Screenshots
[If applicable]

## Additional Context
Any other relevant information
```

## Suggesting Enhancements

We welcome enhancement suggestions! When suggesting an enhancement:

1. **Check existing issues** to see if it's already been suggested
2. **Create a new issue** with the label `enhancement`
3. **Provide details**:
   - Clear description of the enhancement
   - Use cases and benefits
   - Possible implementation approach
   - Any relevant examples or mockups

## Areas Where We Need Help

- **Testing**: Writing unit and integration tests
- **Documentation**: Improving documentation and examples
- **Features**: Implementing items from the roadmap
- **Bug Fixes**: Addressing reported issues
- **Performance**: Optimizing rendering and interactions
- **Accessibility**: Improving keyboard navigation and screen reader support

## Development Tips

### Running Tests
```bash
npm run test        # Run tests
npm run test:watch  # Run tests in watch mode
```

### Type Checking
```bash
npm run typecheck   # Check for TypeScript errors
```

### Linting
```bash
npm run lint        # Run ESLint
npm run lint:fix    # Auto-fix linting issues
```

### Building
```bash
npm run build       # Production build
npm run preview     # Preview production build
```

### Debugging

- Use React DevTools for component debugging
- Use browser DevTools for general debugging
- Check the console for errors and warnings
- Use `console.log` sparingly; prefer the debugger

## Component Development Guidelines

### Creating New Components

1. Create component file in `src/components/`
2. Define proper TypeScript interfaces
3. Export the component
4. Add to relevant parent component
5. Update documentation if needed

### Example Component Structure

```typescript
import { useState } from 'react';

interface MyComponentProps {
  title: string;
  onAction: (value: string) => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({
  title,
  onAction
}) => {
  const [state, setState] = useState('');

  const handleClick = () => {
    onAction(state);
  };

  return (
    <div className="my-component">
      <h2>{title}</h2>
      <button onClick={handleClick}>Action</button>
    </div>
  );
};
```

## Questions?

If you have questions that aren't covered in this guide:

- Open a discussion on GitHub Discussions
- Ask in the issue tracker with the `question` label
- Check the README.md for additional information

## Recognition

Contributors will be recognized in:
- The project README
- Release notes for significant contributions
- GitHub's contributor graph

Thank you for contributing to Database Schema Designer! Your efforts help make this project better for everyone.
