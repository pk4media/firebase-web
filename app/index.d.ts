/// <reference path="../index.d.ts" />
/// <reference path="../storage/index.d.ts" />

declare namespace firebase {
    namespace app {
        interface App {
            /**
             * Access the Storage service from an App instance.
             */
            storage(): storage.Storage;
        }
    }
}