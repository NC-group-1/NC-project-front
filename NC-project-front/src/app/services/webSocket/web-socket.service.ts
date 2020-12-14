import {Injectable} from '@angular/core';

import SockJs from 'sockjs-client';
import Stomp from 'stompjs';
import {apiPath} from '../../../../globals';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor() { }

  public connect(){
    const socket = new SockJs(apiPath + 'ws');
    return Stomp.over(socket);
  }
}
