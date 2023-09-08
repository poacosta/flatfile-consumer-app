import { Flatfile } from "@flatfile/api";

export const config: Pick<
    Flatfile.CreateWorkbookConfig,
    "name" | "sheets" | "actions"
> = {
    name: "Employees workbook",
    sheets: [
        {
            name: "Contacts",
            slug: "Contacts",
            fields: [
                {
                    key: "first_name",
                    type: "string",
                    label: "First name",
                    constraints: [
                        {
                            type: "required",
                        },
                    ],
                },
                {
                    key: "last_name",
                    type: "string",
                    label: "last name",
                    constraints: [
                        {
                            type: "unique",
                        },
                    ],
                },
                {
                    key: "full_name",
                    type: "string",
                    label: "full name",
                },
            ],
        },
    ],
    actions: [
        {
            label: "Submit",
            operation: "contacts:submit",
            description: "Would you like to submit your workbook?",
            mode: "foreground",
            primary: true,
            confirm: true,
        },
    ],
};
