import {parseStringType} from './StringType'

describe('StringType', function () {

  function fixture(xml: string): Element {
    return new window.DOMParser().parseFromString(`<?xml version="1.0" encoding="utf-8"?>
        <Strategies xmlns="http://www.fixprotocol.org/FIXatdl-1-1/Core" xmlns:val="http://www.fixprotocol.org/FIXatdl-1-1/Validation" xmlns:lay="http://www.fixprotocol.org/FIXatdl-1-1/Layout" xmlns:flow="http://www.fixprotocol.org/FIXatdl-1-1/Flow" xmlns:tz="http://www.fixprotocol.org/FIXatdl-1-1/Timezones" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.fixprotocol.org/FIXatdl-1-1/Core fixatdl-core-1-1.xsd" strategyIdentifierTag="7620" versionIdentifierTag="7621">
            <Strategy name="Tazer1" uiRep="Tazer" wireValue="Tazer" version="1" fixMsgType="D" providerID="ABC">
                ${xml}
            </Strategy>
        </Strategies>
    `, 'text/xml').querySelector('Parameter')!
  }

  it('parse attributes', function () {

    let positive = parseStringType(fixture(`
            <Parameter xsi:type="String_t"            
                name="positive"
                fixTag="9999"
                constValue="positive"
            >
			    <Description>Test Parameter</Description>
		    </Parameter>
        `))

    let negative = parseStringType(fixture(`
            <Parameter xsi:type="String_t"            
                name="negative"
                fixTag="8888"
                constValue="NEGATIVE"
            >
		    </Parameter>
        `))

    let optional = parseStringType(fixture(`
            <Parameter xsi:type="String_t"            
                name="optional"
                fixTag="7777"
                use="optional"
                constValue="{NULL}"
            >
		    </Parameter>
        `))

    expect(positive).toMatchObject({
      name: 'positive',
      fixTag: 9999,
      value: 'positive',
      wireValue: 'positive'
    })

    expect(negative).toMatchObject({
      name: 'negative',
      fixTag: 8888,
      value: 'NEGATIVE',
      wireValue: 'NEGATIVE'
    })

    expect(optional).toMatchObject({
      name: 'optional',
      fixTag: 7777,
      use: 'optional',
      value: null,
      wireValue: null
    })

    optional.wireValue = 'AnYtHiNg!'
    expect(optional.value).toBe(optional.wireValue)
  })
})