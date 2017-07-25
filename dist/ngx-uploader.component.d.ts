import { UploaderService } from './uploader.service';
import { iAppend } from './iAppend';
export declare class NgxUploaderComponent {
    private uploaderService;
    file: any;
    canSave: boolean;
    imageUpload: string;
    percentComplete: number;
    percentUpload: any;
    fileInput: any;
    isDrop: boolean;
    fileName: string;
    token: string;
    urlBackend: string;
    appends: Array<iAppend>;
    constructor(uploaderService: UploaderService);
    drop(v: boolean): void;
    uploader(): void;
}
