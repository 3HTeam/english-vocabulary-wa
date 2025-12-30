# Team Collaboration Guidelines

To ensure a smooth workflow and maintain code quality, please follow these guidelines when working on this project.

## 🌿 Git Branching Strategy

We follow a simplified feature-branch workflow. All work should be done in dedicated branches and merged into `main` via Pull Requests.

### 1. The `main` branch

- The `main` branch always contains the latest stable code.
- **Never** commit directly to `main`.
- All merges to `main` must be done through Pull Requests.

### 2. Branch Naming Conventions

Always **checkout from `main`** before starting a new task:

```bash
git checkout main
git pull origin main
```

#### a. Features

For new features, use the `feature/` prefix:

- `feature/user-authentication`
- `feature/vocabulary-list-view`

```bash
git checkout -b feature/your-feature-name
```

#### b. Bug Fixes

For fixing bugs, use the `bug/` prefix:

- `bug/fix-login-redirect`
- `bug/fix-translation-missing-keys`

```bash
git checkout -b bug/your-bug-name
```

## 🔄 Workflow

1.  **Sync**: Ensure your local `main` branch is up to date.
2.  **Branch**: Create a new branch from `main` (`feature/...` or `bug/...`).
3.  **Code**: Implement your changes. Follow the project's coding standards.
4.  **Test**: Ensure your changes don't break existing functionality.
5.  **Commit**: Use descriptive commit messages.
    - Good: `feat: add search functionality to vocabulary list`
    - Bad: `updated code`
6.  **Push**: Push your branch to the remote repository.
    ```bash
    git push origin your-branch-name
    ```
7.  **Pull Request (PR)**: Open a PR on GitHub/GitLab against the `main` branch.
8.  **Review**: Wait for team members to review your code. Address any feedback.
9.  **Merge**: Once approved, the branch will be merged into `main`.

## 🎨 Coding Standards

- Use **Prettier** and **ESLint** (already configured in the project).
- Write clean, self-documenting code.
- Use TypeScript for type safety.
- Keep components small and focused.

---

_Happy Coding!_ 🚀
