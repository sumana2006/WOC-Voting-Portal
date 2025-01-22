name: Bug report
description: Report a bug with the voting system
title: "[BUG] "
labels: ["bug"]
body:
  - type: markdown
    text: "### Describe the bug\nA clear and concise description of what the bug is."
  - type: textarea
    id: steps_to_reproduce
    attributes:
      label: "Steps to reproduce"
      description: "Provide detailed steps to reproduce the issue."
      placeholder: "1. Go to...\n2. Click on...\n3. Scroll down to...\n4. See error"
    validations:
      required: true
  - type: textarea
    id: expected_behavior
    attributes:
      label: "Expected behavior"
      description: "Describe what you expected to happen."
      placeholder: "The voting machine should..."
  - type: textarea
    id: actual_behavior
    attributes:
      label: "Actual behavior"
      description: "Describe what actually happened."
      placeholder: "Instead of the expected behavior, I observed..."
  - type: input
    id: environment
    attributes:
      label: "Environment"
      description: "Provide details about your environment."
      placeholder: "e.g., OS, browser, version"
  - type: textarea
    id: additional_context
    attributes:
      label: "Additional context"
      description: "Add any other context about the problem here."
