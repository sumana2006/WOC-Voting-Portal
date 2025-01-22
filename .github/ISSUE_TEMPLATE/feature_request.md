name: Feature request
description: Suggest a new feature or enhancement for the voting system
title: "[FEATURE] "
labels: ["enhancement"]
body:
  - type: markdown
    text: "### Describe the feature\nProvide a clear and concise description of the feature you are requesting."
  - type: textarea
    id: use_case
    attributes:
      label: "Use case"
      description: "Explain why this feature would be useful and how it will solve a problem."
      placeholder: "This feature would allow users to..."
    validations:
      required: true
  - type: textarea
    id: implementation_ideas
    attributes:
      label: "Implementation ideas"
      description: "Provide any ideas you have for how this feature could be implemented."
      placeholder: "Consider adding..."
  - type: textarea
    id: additional_context
    attributes:
      label: "Additional context"
      description: "Add any other context, screenshots, or details about the feature request."
