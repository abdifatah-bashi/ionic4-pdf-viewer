import { Component } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { Platform } from '@ionic/angular';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  myFiles: any[];
  dummyPDFURL1 = "https://devdactic.com/html/5-simple-hacks-LBT.pdf";
  dummyPDFURL2 = "https://www.oapen.org/download?type=document&docid=577531";
  dummyPDFURL3 = "https://www.btboces.org/Downloads/3_Imagine%20by%20John%20Lennon.pdf";
  
  fileCount: number = 0;

  constructor(private document: DocumentViewer,
              private file : File,
              private transfer: FileTransfer, private platform: Platform) { }
              
  downloadAndOpen(url){
     let path = null;
    if (this.platform.is('ios')) {
      path = this.file.documentsDirectory;
    } else if (this.platform.is('android')) {
      path = this.file.dataDirectory;
    }
    const transfer = this.transfer.create();
    this.fileCount++;
    transfer.download(url, path + 'file'+ this.fileCount).then(entry => {
      let url = entry.toURL();
      this.document.viewDocument(url, 'application/pdf', {});
    });
  }
   
  openLocalPDF(){
   let url = this.file.applicationDirectory+ 'www/assets/test.pdf';
   this.document.viewDocument(url, 'application/pdf', {});

  }

}
