# ngxuploader

## Installation

To install this library, run:

```bash
$ npm install ngxuploader --save
```

## Consuming your library

You can import your library in any Angular application by running:

```bash
$ npm install ngxuploader
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import ngxuploader
import { NgxUploaderComponent } from 'ngxuploader';
import { UploaderService } from 'ngxuploader';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify your library as an import
    NgxUploaderComponent
  ],
providers: [UploaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use this component in your Angular application:

```xml
<!-- You can now use your library component in app.component.html -->
<h1>
  {{title}}
</h1>
<ngx-uploader-component></ngx-uploader-component>
```

## Customize

The component have inputs for support diferent functionalities:

This are the default values => 
```
  @Input() textUpload: string = 'Upload';
  @Input() recommend: string = 'Recommend minimum size 100x100px';
  @Input() textDrop: string = 'Drop Here';
  @Input() token: string = '';
  @Input() urlBackend: string = 'http://localhost:8080/api/file/';
  @Input() appends: Array<iAppend>;
```
You can change in the component, for example: 
```
<ngx-uploader-component
    [textUpload]=" 'Upload here' "
    [recommend]=" {{ recommendText }} "
><ngx-uploader-component>
``` 
- If you need a token for upload the file you need put the token in the parameter `token`

### extra parameters

- appends is all parameters extras for your upload, any parameter extra you need put in the appends

```
export interface iAppend {
    name: string;
    value: string;
}
```
For example the folder in your server for upload the file

```
myAppend = [
    { 'uploadFolder': '/avatarFolder' }
] 
```
```
<ngx-uploader-component
    [appends]='myAppend'
><ngx-uploader-component>
```


## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## issues

report in [github](https://github.com/jorgeucano/ngxuploader/issues) 

## DEMO

[stackblitz](https://stackblitz.com/edit/angular-fhacrk)
the demo its only angular right now, no have backend (wip)

## License

MIT © [Jorge Cano](mailto:jorgeucano@gmail.com)
