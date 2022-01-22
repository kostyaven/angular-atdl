import {parseTenorType} from './TenorType'

describe('TenorType', function () {

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

    let month = parseTenorType(fixture(`
            <Parameter xsi:type="String_t"            
                name="month"
                fixTag="9999"
                constValue="M1"
            ></Parameter>
        `))

    expect(month).toMatchObject({
      name: 'month',
      fixTag: 9999,
      value: {type: 'M', duration: 1},
      wireValue: 'M1'
    })

    let week = parseTenorType(fixture(`
            <Parameter xsi:type="String_t"            
                name="week"
                fixTag="9999"
                constValue="W13"
            ></Parameter>
        `))

    expect(week).toMatchObject({
      name: 'week',
      fixTag: 9999,
      value: {type: 'W', duration: 13},
      wireValue: 'W13'
    })

    let day = parseTenorType(fixture(`
            <Parameter xsi:type="String_t"            
                name="day"
                fixTag="9999"
                constValue="D5"
            ></Parameter>
        `))

    expect(day).toMatchObject({
      name: 'day',
      fixTag: 9999,
      value: {type: 'D', duration: 5},
      wireValue: 'D5'
    })

    let year = parseTenorType(fixture(`
            <Parameter xsi:type="String_t"            
                name="year"
                fixTag="9999"
                constValue="Y1"
            ></Parameter>
        `))

    expect(year).toMatchObject({
      name: 'year',
      fixTag: 9999,
      value: {type: 'Y', duration: 1},
      wireValue: 'Y1'
    })

  })
})
