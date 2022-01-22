import {parseNumericType} from './NumericType'

describe('NumericType', function () {

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

    let positive = parseNumericType(fixture(`
            <Parameter xsi:type="Numeric_t"            
                name="positive"
                fixTag="9999"
                constValue="10"
            ></Parameter>
        `))

    let negative = parseNumericType(fixture(`
            <Parameter xsi:type="Numeric_t"            
                name="negative"
                fixTag="8888"
                definedByFIX="false"
                constValue="-1"
            >
		    </Parameter>
        `))

    let optional = parseNumericType(fixture(`
            <Parameter xsi:type="Numeric_t"            
                name="optional"
                fixTag="7777"
                use="optional"
                precision="2"
                constValue="0.0001"
            >
		    </Parameter>
        `))

    let limited = parseNumericType(fixture(`
            <Parameter xsi:type="Numeric_t"            
                name="limited"
                fixTag="6666"
                precision="4"
                minValue="-1"
                maxValue="1"
                constValue="0"
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
      precision: 2,
      value: 0.0001,
      wireValue: '0.00'
    })

    expect(limited).toMatchObject({
      name: 'limited',
      fixTag: 6666,
      precision: 4,
      minValue: -1,
      maxValue: 1,
      value: 0,
      wireValue: '0.0000'
    })

    limited.wireValue = '0.1'
    expect(limited.value).toBe(0.1)
  })
})