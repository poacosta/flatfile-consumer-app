import { recordHook } from "@flatfile/plugin-record-hook";
import api from "@flatfile/api";
import { FlatfileListener } from "@flatfile/listener";

async function submit(jobId: string) {
    await api.jobs.ack(jobId, {
        info: "I'm starting the job - inside client",
        progress: 33,
    });

    // hit your api here
    await new Promise((res) => setTimeout(res, 2000));

    await api.jobs.complete(jobId, {
        info: "Job's work is done",
        outcome: { next: { type: "wait" } },
    });
}

/**
 * Example Listener
 */

export const listener = FlatfileListener.create((client) => {
    // Lowercases the first_name field
    client.use(
        recordHook("Contacts", (record) => {
            const value = record.get("first_name");
            if (typeof value === "string") {
                record.set("first_name", value.toLowerCase());
            }
            return record;
        })
    );
    // Waits for the submit button to be clicked
    client.on(
        "job:ready",
        // @ts-ignore
        { payload: { operation: "contacts:submit" } },
        async (event: any) => {
            const { context } = event;
            return submit(context.jobId);
        }
    );
});
