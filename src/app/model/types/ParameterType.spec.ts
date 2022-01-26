import {parseParameterType} from './ParameterType'

describe('ParameterType', function () {

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

    let positive = parseParameterType(fixture(`
            <Parameter xsi:type="Boolean_t"            
                name="positive"
                fixTag="9999"
                use="required"
                mutableOnCxlRpl="true"
                revertOnCxlRpl="true"
                definedByFIX="true"
                constValue="Y"
            >
			    <Description>Test Parameter</Description>
		    </Parameter>
        `), {
      format: x => x ? 'Y' : 'N',
      parse: x => x === 'Y'
    }, {})

    let negative = parseParameterType(fixture(`
            <Parameter xsi:type="Boolean_t"            
                name="negative"
                fixTag="8888"
                definedByFIX="false"
                constValue="N"
            >
		    </Parameter>
        `), {
      format: x => x ? 'Y' : 'N',
      parse: x => x === 'Y'
    }, {})

    let optional = parseParameterType(fixture(`
            <Parameter xsi:type="Boolean_t"            
                name="optional"
                fixTag="7777"
                use="optional"
                constValue="{NULL}"
            >
		    </Parameter>
        `), {
      format: x => x ? 'Y' : 'N',
      parse: x => x === 'Y'
    }, {})

    expect(positive).toMatchObject({
      name: 'positive',
      fixTag: 9999,
      use: 'required',
      mutableOnCxlRpl: true,
      revertOnCxlRpl: true,
      definedByFIX: true,
      description: 'Test Parameter',
      enumPairs: null,
      value: true,
      wireValue: 'Y'
    })

    expect(negative).toMatchObject({
      name: 'negative',
      fixTag: 8888,
      use: 'optional',
      mutableOnCxlRpl: false,
      revertOnCxlRpl: false,
      definedByFIX: false,
      description: null,
      enumPairs: null,
      value: false,
      wireValue: 'N'
    })

    expect(optional).toMatchObject({
      name: 'optional',
      fixTag: 7777,
      use: 'optional',
      definedByFIX: false,
      value: null,
      wireValue: null
    })

    positive.wireValue = 'N'
    expect(positive.value).toBe(false)

    negative.wireValue = 'N'
    expect(negative.value).toBe(false)

    optional.wireValue = 'Y'
    expect(optional.value).toBe(true)
    optional.wireValue = 'N'
    expect(optional.value).toBe(false)
    optional.wireValue = null
    expect(optional.value).toBe(null)
  })
})