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
  
  //let barUrl= "https://test.buyandread.com/read/jarbladet-20181102_000_00_00.pdf?pub=1747&date=20181102&download=true";
  //let url = "https://devdactic.com/html/5-simple-hacks-LBT.pdf";
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
