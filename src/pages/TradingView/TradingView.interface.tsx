export interface IMaxGain {
  maxGain: string
  maxGainPercentage: string
}

export interface IMaxLoss {
  maxLoss: string
  maxLossPercentage: string
}

export interface IMaxDrawdown {
  maxDrawdown: string
  maxMonetaryLoss: string
}

export interface EndpointMapping {
  base: string
  mappings: {
    bull: string
    bear: string
    stg: string
    cross: string
  }
}

export interface IEndpointMappings {
  [key: string]: EndpointMapping
}
