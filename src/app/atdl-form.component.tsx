import {
  AfterViewInit,
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import {Provider} from 'react-redux'
import React from 'react';
import ReactDOM from 'react-dom';
import { AtdlForm } from './components/AtdlForm';
import {store} from './redux'

const containerElementName = 'customReactComponentContainer';

@Component({
  selector: 'app-atdl-form',
  template: `<span #${containerElementName}></span>`,
  styleUrls: ['./components/styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AtdlFormComponent implements OnChanges, OnDestroy, AfterViewInit {
  @ViewChild(containerElementName, { static: true }) containerRef!: ElementRef;

  private _document!:Document;
  private _standardFixFields!:{[name: string]: any};
  
   ngOnChanges(changes: SimpleChanges): void {
      this.render();
  }

  ngAfterViewInit() {
    fetch('samples/strategy.xml').then(async response => {
      if (response.ok) {
        let xml = await response.text()
        let parser = new DOMParser()
        this._document = await parser.parseFromString(xml, 'application/xml')
        this.render();
      }
    })
  }

  ngOnDestroy() {
      ReactDOM.unmountComponentAtNode(this.containerRef.nativeElement);
  }

  private render() {
    if (this._document) {
      this._standardFixFields = {};
      let strategyName = this._document.querySelectorAll('Strategy')[0].getAttribute('name')!;
      ReactDOM.render(
        <React.StrictMode>
          <Provider store={store}>
            <div>
              <AtdlForm document={this._document} strategyName={strategyName} standardFixFields={this._standardFixFields}/>
            </div>
            </Provider>
        </React.StrictMode>,
        this.containerRef.nativeElement);
      }
  }
}