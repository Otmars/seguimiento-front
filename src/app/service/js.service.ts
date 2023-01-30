import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsService {

  constructor() { }
  public loadScript() {
    console.log("entrando");
    
    console.log('preparing to load...')

    let node = document.createElement('script');

    node.src = 'assets/js/script.js';

    node.type = 'text/javascript';

    node.async = true;

    document.getElementsByTagName('head')[0].appendChild(node);

  }
}
