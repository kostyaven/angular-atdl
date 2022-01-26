import {parseUTCTimestampType} from './UTCTimestampType'

describe('UTCTimestampType', function () {

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

    let halfpastmidday = parseUTCTimestampType(fixture(`
            <Parameter xsi:type="UTCTimestampType_t"            
                name="halfpastmidday"
                fixTag="9999"
                constValue="12:30:00"
            ></Parameter>
        `))

    let xmas = parseUTCTimestampType(fixture(`
            <Parameter xsi:type="UTCTimestampType_t"            
                name="xmas"
                fixTag="8888"
                constValue="20201225"
            >
		    </Parameter>
        `))

    let birthday = parseUTCTimestampType(fixture(`
            <Parameter xsi:type="UTCTimestampType_t"            
                name="birthday"
                fixTag="7777"
                use="optional"
                constValue="19740412-08:30:00.000"
            >
		    </Parameter>
        `))

    let birthday2019 = parseUTCTimestampType(fixture(`
            <Parameter xsi:type="UTCTimestampType_t"            
                name="birthday2019"
                fixTag="6666"
                minValue="20190412-08:00:00"
                maxValue="20190412-09:00:00"
                localMktTz="America/New_York"
                constValue="20190412-08:30:00"
            >
		    </Parameter>
        `))

    expect(halfpastmidday).toMatchObject({
      name: 'halfpastmidday',
      fixTag: 9999,
      value: new Date('1974-04-12T12:30:00.000Z'),
      wireValue: '19740412-12:30:00.000'
    })

    halfpastmidday.wireValue = '11:22:33.123'
    expect(halfpastmidday.value).toMatchObject(new Date('1974-04-12T11:22:33.123Z'))

    expect(xmas).toMatchObject({
      name: 'xmas',
      fixTag: 8888,
      value: new Date('2020-12-25T00:00:00.000Z'),
      wireValue: '20201225-00:00:00.000'
    })

    expect(birthday).toMatchObject({
      name: 'birthday',
      fixTag: 7777,
      use: 'optional',
      value: new Date('1974-04-12T08:30:00.000Z'),
      wireValue: '19740412-08:30:00.000'
    })

    expect(birthday2019).toMatchObject({
      name: 'birthday2019',
      fixTag: 6666,
      minValue: new Date('2019-04-12T13:00:00.000Z'),
      maxValue: new Date('2019-04-12T14:00:00.000Z'),
      value: new Date('2019-04-12T13:30:00.000Z'),
      wireValue: '20190412-13:30:00.000'
    })
  })
})