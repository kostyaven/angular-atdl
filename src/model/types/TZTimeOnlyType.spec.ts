import {parseTZTimeOnlyType} from './TZTimeOnlyType'

describe('TZTimeOnlyType', function () {

  function fixture(xml: string): Element {
    return new window.DOMParser().parseFromString(`<?xml version="1.0" encoding="utf-8"?>
        <Strategies xmlns="http://www.fixprotocol.org/FIXatdl-1-1/Core" xmlns:val="http://www.fixprotocol.org/FIXatdl-1-1/Validation" xmlns:lay="http://www.fixprotocol.org/FIXatdl-1-1/Layout" xmlns:flow="http://www.fixprotocol.org/FIXatdl-1-1/Flow" xmlns:tz="http://www.fixprotocol.org/FIXatdl-1-1/Timezones" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.fixprotocol.org/FIXatdl-1-1/Core fixatdl-core-1-1.xsd" strategyIdentifierTag="7620" versionIdentifierTag="7621">
            <Strategy name="Tazer1" uiRep="Tazer" wireValue="Tazer" version="1" fixMsgType="D" providerID="ABC">
                ${xml}
            </Strategy>
        </Strategies>
    `, 'text/xml').querySelector('Parameter')!
  }

  const globalDate = global.Date

  beforeAll(function () {
    global.Date = class extends Date {
      constructor(value: number | string) {
        super(value ? value : '1974-04-12T08:30:00.000Z')
      }
    } as typeof Date
  })

  afterAll(function () {
    global.Date = globalDate
  })

  it('parse attributes', function () {

    let withoutTz = parseTZTimeOnlyType(fixture(`
            <Parameter xsi:type="TZTimeOnlyType_t"            
                name="withoutTz"
                fixTag="9999"
                constValue="12:30:00Z"
            ></Parameter>
        `))

    let withTz = parseTZTimeOnlyType(fixture(`
            <Parameter xsi:type="TZTimeOnlyType_t"            
                name="withTz"
                fixTag="6666"
                minValue="08:00:00-05:00"
                maxValue="09:00:00-05:00"
                constValue="08:30:00-05:00"
            >
		    </Parameter>
        `))

    expect(withoutTz).toMatchObject({
      name: 'withoutTz',
      fixTag: 9999,
      value: new Date('1974-04-12T12:30:00.000Z'),
      wireValue: '12:30:00Z'
    })

    withoutTz.wireValue = '11:22:33Z'
    expect(withoutTz.value).toMatchObject(new Date('1974-04-12T11:22:33Z'))

    expect(withTz).toMatchObject({
      name: 'withTz',
      fixTag: 6666,
      minValue: new Date('1974-04-12T13:00:00.000Z'),
      maxValue: new Date('1974-04-12T14:00:00.000Z'),
      value: new Date('1974-04-12T13:30:00.000Z'),
      wireValue: '13:30:00Z'
    })
  })
})