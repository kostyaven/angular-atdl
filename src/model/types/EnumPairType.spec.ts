import {parseEnumPairs} from './EnumPairType'

describe('EnumPairs & EnumPairType', function () {

  function fixture(xml: string): Element {
    return new window.DOMParser().parseFromString(`<?xml version="1.0" encoding="utf-8"?>
        <Strategies xmlns="http://www.fixprotocol.org/FIXatdl-1-1/Core" xmlns:val="http://www.fixprotocol.org/FIXatdl-1-1/Validation" xmlns:lay="http://www.fixprotocol.org/FIXatdl-1-1/Layout" xmlns:flow="http://www.fixprotocol.org/FIXatdl-1-1/Flow" xmlns:tz="http://www.fixprotocol.org/FIXatdl-1-1/Timezones" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.fixprotocol.org/FIXatdl-1-1/Core fixatdl-core-1-1.xsd" strategyIdentifierTag="7620" versionIdentifierTag="7621">
            <Strategy name="Tazer1" uiRep="Tazer" wireValue="Tazer" version="1" fixMsgType="D" providerID="ABC">
                <Parameter name="SweepDistribution" xsi:type="Char_t" fixTag="7640" use="required">
                ${xml}
                </Parameter>
            </Strategy>
        </Strategies>
    `, 'text/xml').querySelector('Parameter')!
  }

  it('no children yields null', function () {
    expect(parseEnumPairs(fixture(''))).toBe(null)
  })

  it('parse attributes', function () {
    let enumPairs = parseEnumPairs(fixture(`
            <EnumPair enumID="e_Uniform" wireValue="U" index="1">
				<Description>The 'Uniform' setting for Sweep Distribution</Description>
			</EnumPair>
			<EnumPair enumID="e_Gaussian" wireValue="G" index="2">
				<Description>The 'Gaussian' setting for Sweep Distribution</Description>
			</EnumPair>
			<EnumPair enumID="e_None" wireValue="{NULL}">				
			</EnumPair>
        `))

    expect(enumPairs).toMatchObject({
      'e_Uniform': {
        index: 1,
        description: 'The \'Uniform\' setting for Sweep Distribution',
        enumID: 'e_Uniform',
        wireValue: 'U'
      },
      'e_Gaussian': {
        index: 2,
        description: 'The \'Gaussian\' setting for Sweep Distribution',
        enumID: 'e_Gaussian',
        wireValue: 'G'
      },
      'e_None': {
        index: null,
        description: null,
        enumID: 'e_None',
        wireValue: '{NULL}'
      }
    })
  })
})
