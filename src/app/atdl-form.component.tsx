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

//import React, {StrictMode} from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import { AtdlForm } from '../components/AtdlForm';

const containerElementName = 'customReactComponentContainer';

@Component({
  selector: 'app-atdl-form',
  template: `<span #${containerElementName}></span>`,
  // styleUrls: [''],
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
        //setDocument(document)
        this.render();
      }
    })
  }

  ngOnDestroy() {
      ReactDOM.unmountComponentAtNode(this.containerRef.nativeElement);
  }

  //<AtdlForm document={document} strategyName={strategyName} standardFixFields={standardFixFields}/>
  private render() {
    if (document) {
      let strategyName = this._document.querySelectorAll('Strategy')[0].getAttribute('name')!
      ReactDOM.render(
        <React.StrictMode>
            <div>
              <AtdlForm document={document} strategyName={strategyName} standardFixFields={this._standardFixFields}/>
              <label>Test</label>
            </div>
        </React.StrictMode>,
        this.containerRef.nativeElement);
      }
  }
}