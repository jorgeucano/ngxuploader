import { iAppend } from './iAppend';
export declare class UploaderService {
    percentComplete: number;
    percentUpload$: any;
    nameUpload$: any;
    isUpload$: any;
    constructor();
    createSubjects(): void;
    unsubscribeSubjects(): void;
    uploadXHR(file: any, token: string | '', appends: Array<iAppend>, urlBackend: string): void;
    setImageUrl(xhrResponse: any): void;
}
