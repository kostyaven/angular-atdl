import {parseIntType} from './IntType'

describe('IntType', function () {

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

    let positive = parseIntType(fixture(`
            <Parameter xsi:type="Int_t"            
                name="positive"
                fixTag="9999"
                constValue="10"
            ></Parameter>
        `))

    let negative = parseIntType(fixture(`
            <Parameter xsi:type="Int_t"            
                name="negative"
                fixTag="8888"
                definedByFIX="false"
                constValue="-1"
            >
		    </Parameter>
        `))

    let optional = parseIntType(fixture(`
            <Parameter xsi:type="Int_t"            
                name="optional"
                fixTag="7777"
                use="optional"
                constValue="0.0001"
            >
		    </Parameter>
        `))

    let limited = parseIntType(fixture(`
            <Parameter xsi:type="Int_t"            
                name="limited"
                fixTag="6666"
                minValue="-10"
                maxValue="10"
                constValue="3cm"
            >
		    </Parameter>
        `))

    expect(positive).toMatchObject({
      name: 'positive',
      fixTag: 9999,
      value: 10,
      wireValue: '10'
    })

    expect(negative).toMatchObject({
      name: 'negative',
      fixTag: 8888,
      value: -1,
      wireValue: '-1'
    })

    expect(optional).toMatchObject({
      name: 'optional',
      fixTag: 7777,
      use: 'optional',
      value: 0,
      wireValue: '0'
    })

    expect(limited).toMatchObject({
      name: 'limited',
      fixTag: 6666,
      minValue: -10,
      maxValue: 10,
      value: 3,
      wireValue: '3'
    })

    limited.wireValue = '0.1'
    expect(limited.value).toBe(0)

    limited.wireValue = '1l'
    expect(limited.value).toBe(1)
  })
})