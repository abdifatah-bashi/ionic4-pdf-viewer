import { File } from '@ionic-native/file/ngx';
import { Platform, NavController } from '@ionic/angular';
import { Component } from '@angular/core';
import { DocumentViewerOptions, DocumentViewer } from '@ionic-native/document-viewer/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  myFiles: any[];
  
  constructor(private platform: Platform,
              private document: DocumentViewer,
              private file: File,){ }


    ionViewDidEnter(){
     this.listFiles();
    }
  open(file){
 
    const options: DocumentViewerOptions = {
      title: 'My PDF'
    }
    const url = file.nativeURL;
    this.document.viewDocument(url, 'application/pdf', options);   
  }
  listFiles (){    
    let path = null;
    if (this.platform.is('ios')) {
      path = this.file.documentsDirectory;
      this.file.listDir( path,'')
      .then(files => this.myFiles= files)
      .catch(err => console.log("list file err: " + JSON.stringify(err))
      );
      console.log("number of files: " + this.myFiles.length);
      this.myFiles.forEach(file => console.log("current file: " + JSON.stringify(file )));
    } else if (this.platform.is('android')) {
      path = this.file.dataDirectory;
    }
  }
}
