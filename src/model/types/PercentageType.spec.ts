import {parsePercentageType} from './PercentageType'

describe('PercentageType', function () {

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

    let first = parsePercentageType(fixture(`
            <Parameter xsi:type="Numeric_t"            
                name="first"
                fixTag="9999"
                multiplyBy100="true"
                constValue="10"
            ></Parameter>
        `))

    let second = parsePercentageType(fixture(`
            <Parameter xsi:type="Numeric_t"            
                name="second"
                fixTag="8888"
                constValue=".5"
            >
		    </Parameter>
        `))

    let optional = parsePercentageType(fixture(`
            <Parameter xsi:type="Numeric_t"            
                name="optional"
                fixTag="7777"
                use="optional"
                precision="2"
                constValue="0.0001"
            >
		    </Parameter>
        `))

    let limited = parsePercentageType(fixture(`
            <Parameter xsi:type="Numeric_t"            
                name="limited"
                fixTag="6666"
                multiplyBy100="true"
                minValue="10"
                maxValue="90"
                constValue="50"
            >
		    </Parameter>
        `))

    expect(first).toMatchObject({
      name: 'first',
      fixTag: 9999,
      multiplyBy100: true,
      value: .1,
      wireValue: '10'
    })

    expect(second).toMatchObject({
      name: 'second',
      fixTag: 8888,
      value: .5,
      wireValue: '0.50'
    })

    expect(optional).toMatchObject({
      name: 'optional',
      fixTag: 7777,
      use: 'optional',
      precision: 4,
      value: 0.0001,
      wireValue: '0.0001'
    })

    expect(limited).toMatchObject({
      name: 'limited',
      fixTag: 6666,
      precision: 0,
      minValue: .1,
      maxValue: .9,
      value: .5,
      wireValue: '50'
    })

    limited.wireValue = '0.1'
    expect(limited.value).toBe(0.001)
  })
})