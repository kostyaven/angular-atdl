import {parseUTCDateOnlyType} from './UTCDateOnlyType'

describe('UTCDateOnlyType', function () {

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

    let xmas = parseUTCDateOnlyType(fixture(`
            <Parameter xsi:type="UTCDateOnlyType_t"            
                name="xmas"
                fixTag="8888"
                constValue="20201225"
            >
		    </Parameter>
        `))

    expect(xmas).toMatchObject({
      name: 'xmas',
      fixTag: 8888,
      value: new Date('2020-12-25T00:00:00.000Z'),
      wireValue: '20201225'
    })
  })
})