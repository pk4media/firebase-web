/// <reference path="../index.d.ts" />
/// <reference path="../app/index.d.ts" />


declare namespace firebase {
    export function storage(app?: app.App): storage.Storage;

    namespace storage {
        interface TaskEvent {
            STATE_CHANGED: string;
        }

        export var TaskEvent: TaskEvent;

        interface TaskState {
            RUNNING: string;
            PAUSED: string;
            SUCCESS: string;
            CANCELED: string;
            ERROR: string;
        }

        export var TaskState: TaskState;
        
        interface Storage {
            /**
             * The app associated with this service.
             */
            app: app.App;

            /**
             * The maximum time to retry operations other than uploads or downloads in milliseconds.
             */
            maxOperationRetryTime: number;

            /**
             * The maximum time to retry uploads in milliseconds.
             */
            maxUploadRetryTime: number;

            /**
             * Returns a reference for the given path in the default bucket.
             */
            ref(path?: string): Reference;

            /**
             * Returns a reference for the given absolute URL.
             */
            refFromURL(url: string): Reference;

            setMaxOperationRetryTime(time: number): void;

            setMaxUploadRetryTime(time: number): void;
        }

        interface Reference {
            /**
             * The name of the bucket containing this reference's object.
             */
            bucket: string;

            /**
             * The full path of this object.
             */
            fullPath: string;

            /**
             * The short name of this object, which is the last component of the full path.
             * For example, if fullPath is 'full/path/image.png', name is 'image.png'.
             */
            name: string;

            /**
             * A reference pointing to the parent location of this reference, or null if this reference is the root.
             */
            parent: Reference;

            /**
             * A reference to the root of this reference's bucket.
             */
            root: Reference;

            /**
             * The storage service associated with this reference.
             */
            storage: Storage;

            /**
             * Returns a reference to a relative path from this reference.
             */
            child(path: string): Reference;

            /**
             * Uploads data to this reference's location.
             */
            put(blob: Buffer, metadata?: UploadMetadata): UploadTask;

            /**
             * Deletes the object at this reference's location.
             */
            delete(): Promise<void>;

            /**
             * Fetches a long lived download URL for this object.
             */
            getDownloadURL(): Promise<string>;

            /**
             * Fetches metadata for the object at this location, if one exists.
             */
            getMetadata(): Promise<FullMetadata>;

            /**
             * Updates the metadata for the object at this location, if one exists.
             */
            updateMetadata(metadata: SettableMetadata): Promise<FullMetadata>;

            /**
             * Returns a gs:// URL for this object in the form gs://<bucket>/<path>/<to>/<object>
             */
            toString(): string;
        }

        interface UploadTaskSnapshot {
            /**
             * The number of bytes that have been successfully uploaded so far.
             */
            bytesTransfered: number;

            /**
             * After the upload completes, contains a long-lived download URL for the object.
             * Also accessible in metadata.
             */
            downloadURL: string;

            /**
             * Before the upload completes, contains the metadata sent to the server.
             * After the upload completes, contains the metadata sent back from the server.
             */
            metadata: FullMetadata;

            /**
             * The reference that spawned this snapshot's upload task.
             */
            ref: Reference;

            /**
             * The current state of the task.
             */
            state: string;

            /**
             * The task of which this is a snapshot.
             */
            task: UploadTask;

            /**
             * The total number of bytes to be uploaded.
             */
            totalBytes: number;
        }

        interface Observer {
            next?: (item: Object) => void;
            error?: (error: Error) => void;
            complete?: () => void;
        }

        interface UploadTask {
            /**
             * A snapshot of the current task state.
             */
            snapshot: UploadTaskSnapshot;

            /**
             * Pauses a running task. Has no effect on a paused or failed task.
             */
            pause(): boolean;

            /**
             * Resumes a paused task. Has no effect on a running or failed task.
             */
            resume(): boolean;

            /**
             * Cancels a running task. Has no effect on a complete or failed task.
             */
            cancel(): boolean;

            /**
             * Listens for events on this task.
             * Events have three callback functions (referred to as next, error, and complete).
             */
            on(event: string): (observer: Observer) => () => void;
            on(event: string): (next: (item: Object) => void, error?: (error: Error) => void, complete?: () => void) => () => void;
            on(event: string, observer: Observer): () => void;
            on(event: string, next: (item: Object) => void, error?: (error: Error) => void, complete?: () => void): () => void;
        }

        interface SettableMetadata {
            /**
             * Served as the 'Cache-Control' header on object download.
             */
            cacheControl?: string;

            /**
             * Served as the 'Content-Disposition' header on object download.
             */
            contentDisposition?: string;

            /**
             * Served as the 'Content-Encoding' header on object download.
             */
            contentEncoding?: string;

            /**
             * Served as the 'Content-Language' header on object download.
             */
            contentLanguage?: string;

            /**
             * Served as the 'Content-Type' header on object download.
             */
            contentType?: string;

            /**
             * Additional user-defined custom metadata.
             */
            customMetadata?: {
                [key: string]: string;
            }
        }

        interface UploadMetadata extends SettableMetadata {
            /**
             * A Base64-encoded MD5 hash of the object being uploaded.
             * If set, the server will calculate the MD5 of the data it receives and reject the upload if the hash differs.
             */
            md5Hash?: string;
        }

        interface FullMetadata extends UploadMetadata {
            /**
             * The bucket this object is contained in.
             */
            bucket: string;

            /**
             * An array of long-lived download URLs. Always contains at least one URL.
             */
            downloadURLs: string[];

            /**
             * The full path of this object.
             */
            fullPath: string;

            /**
             * The object's generation.
             */
            generation: string;

            /**
             * The object's metageneration.
             */
            metageneration: string;

            /**
             * The short name of this object, which is the last component of the full path.
             * For example, if fullPath is 'full/path/image.png', name is 'image.png'.
             */
            name: string;

            /**
             * The size of this object, in bytes.
             */
            size: number;

            /**
             * A date string representing when this object was created.
             */
            timeCreated: string;

            /**
             * A date string representing when this object was last updated.
             */
            updated: string;
        }
    }
}