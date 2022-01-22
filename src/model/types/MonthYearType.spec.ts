import {parseMonthYearType} from './MonthYearType'

describe('MonthYearType', function () {

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

    let xmas = parseMonthYearType(fixture(`
            <Parameter xsi:type="MonthYearType_t"            
                name="xmas"
                fixTag="8888"
                constValue="20201225"
            >
		    </Parameter>
        `))

    expect(xmas).toMatchObject({
      name: 'xmas',
      fixTag: 8888,
      value: {
        year: 2020,
        month: 12,
        day: 25,
        week: undefined
      },
      wireValue: '20201225'
    })

    let firstweek = parseMonthYearType(fixture(`
            <Parameter xsi:type="MonthYearType_t"            
                name="firstweek"
                fixTag="8888"
                constValue="202012W1"
            >
		    </Parameter>
        `))

    expect(firstweek).toMatchObject({
      name: 'firstweek',
      fixTag: 8888,
      value: {
        year: 2020,
        month: 12,
        day: undefined,
        week: 1
      },
      wireValue: '202012W1'
    })

    firstweek.wireValue = '202012'

    expect(firstweek).toMatchObject({
      value: {
        year: 2020,
        month: 12,
        day: undefined,
        week: undefined
      },
      wireValue: '202012'
    })
  })
})