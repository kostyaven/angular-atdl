import {ArgsProps} from 'antd/lib/notification'

describe('MultipleStringValueType', function () {

  function fixture(xml: string): Element {
    return new window.DOMParser().parseFromString(`<?xml version="1.0" encoding="utf-8"?>
        <Strategies xmlns="http://www.fixprotocol.org/FIXatdl-1-1/Core" xmlns:val="http://www.fixprotocol.org/FIXatdl-1-1/Validation" xmlns:lay="http://www.fixprotocol.org/FIXatdl-1-1/Layout" xmlns:flow="http://www.fixprotocol.org/FIXatdl-1-1/Flow" xmlns:tz="http://www.fixprotocol.org/FIXatdl-1-1/Timezones" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.fixprotocol.org/FIXatdl-1-1/Core fixatdl-core-1-1.xsd" strategyIdentifierTag="7620" versionIdentifierTag="7621">
            <Strategy name="Tazer1" uiRep="Tazer" wireValue="Tazer" version="1" fixMsgType="D" providerID="ABC">
                ${xml}
            </Strategy>
        </Strategies>
    `, 'text/xml').querySelector('Parameter')!
  }

  it('parse attributes', async function () {

    const {parseMultipleStringValueType} = await import('./MultipleStringValueType')

    let positive = parseMultipleStringValueType(fixture(`
            <Parameter xsi:type="MultipleStringValue_t"            
                name="positive"
                fixTag="9999"
                constValue="+ + +"
            >
			    <Description>Test Parameter</Description>
		    </Parameter>
        `))

    let negative = parseMultipleStringValueType(fixture(`
            <Parameter xsi:type="MultipleStringValue_t"            
                name="negative"
                fixTag="8888"
                constValue=" minus MINUS "
            >
		    </Parameter>
        `))

    expect(positive).toMatchObject({
      name: 'positive',
      fixTag: 9999,
      value: ['+', '+', '+'],
      wireValue: '+ + +'
    })

    expect(negative).toMatchObject({
      name: 'negative',
      fixTag: 8888,
      value: ['minus', 'MINUS'],
      wireValue: 'minus MINUS'
    })
  })

  it('{NULL} & invertOnWire', async function () {

    jest.doMock('antd', () => ({
      notification: {
        warn(args: ArgsProps): void {
          expect(args.message).toMatch('MISSING FIX-ATDL FEATURE')
        }
      }
    }))

    const {parseMultipleStringValueType} = await import('./MultipleStringValueType')

    let optional = parseMultipleStringValueType(fixture(`
            <Parameter xsi:type="MultipleStringValue_t"            
                name="optional"
                fixTag="7777"
                use="optional"
                invertOnWire="true"
                constValue="{NULL}"
            >
		    </Parameter>
        `))

    expect(optional).toMatchObject({
      name: 'optional',
      fixTag: 7777,
      use: 'optional',
      value: null,
      wireValue: null
    })

    optional.wireValue = '\nAnY tHiNg!'
    expect(optional.value).toStrictEqual(['AnY', 'tHiNg!'])
  })
})
