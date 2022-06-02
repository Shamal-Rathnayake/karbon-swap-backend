export default {
  poolContract: [
    {
      inputs: [
        {
          internalType: "address",
          name: "_foreignTokenAddress",
          type: "address",
        },
        {
          internalType: "address",
          name: "_nativeTokenAddress",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          components: [
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "receivedAmount",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "isFull",
              type: "bool",
            },
            {
              internalType: "uint256",
              name: "sentAmount",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "stakeBalance",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "foreignReserve",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "nativeReserve",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "kValue",
                  type: "uint256",
                },
              ],
              internalType: "struct LiquidityPool.statusStruct",
              name: "startValue",
              type: "tuple",
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "foreignReserve",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "nativeReserve",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "kValue",
                  type: "uint256",
                },
              ],
              internalType: "struct LiquidityPool.statusStruct",
              name: "endValue",
              type: "tuple",
            },
            {
              internalType: "string",
              name: "userId",
              type: "string",
            },
          ],
          indexed: false,
          internalType: "struct LiquidityPool.liquidityStruct",
          name: "liquidityStructObj",
          type: "tuple",
        },
      ],
      name: "addLiquidityEvent",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_commission",
          type: "uint256",
        },
      ],
      name: "changeCommission",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "foreignTokenAmount",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "txFull",
          type: "bool",
        },
        {
          internalType: "string",
          name: "userId",
          type: "string",
        },
      ],
      name: "exchangeForeignToken",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_foreignTokenValue",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_nativeTokenValue",
          type: "uint256",
        },
      ],
      name: "initPool",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          components: [
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "bool",
              name: "isForeignSwap",
              type: "bool",
            },
            {
              internalType: "uint256",
              name: "receivedAmount",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "sentAmount",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "commission",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "foreignReserve",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "nativeReserve",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "kValue",
                  type: "uint256",
                },
              ],
              internalType: "struct LiquidityPool.statusStruct",
              name: "startValue",
              type: "tuple",
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "foreignReserve",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "nativeReserve",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "kValue",
                  type: "uint256",
                },
              ],
              internalType: "struct LiquidityPool.statusStruct",
              name: "endValue",
              type: "tuple",
            },
          ],
          indexed: false,
          internalType: "struct LiquidityPool.swapStruct",
          name: "swapStructObj",
          type: "tuple",
        },
      ],
      name: "swapEvent",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "foreignTokenAmount",
          type: "uint256",
        },
      ],
      name: "swapForeignToken",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "nativeTokenAmount",
          type: "uint256",
        },
      ],
      name: "swapNativeToken",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "receiver",
          type: "address",
        },
        {
          internalType: "string",
          name: "recordId",
          type: "string",
        },
      ],
      name: "withdraw",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          components: [
            {
              internalType: "address",
              name: "receiver",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "receivedAmount",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "recordId",
              type: "string",
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "foreignReserve",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "nativeReserve",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "kValue",
                  type: "uint256",
                },
              ],
              internalType: "struct LiquidityPool.statusStruct",
              name: "startValue",
              type: "tuple",
            },
            {
              components: [
                {
                  internalType: "uint256",
                  name: "foreignReserve",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "nativeReserve",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "kValue",
                  type: "uint256",
                },
              ],
              internalType: "struct LiquidityPool.statusStruct",
              name: "endValue",
              type: "tuple",
            },
          ],
          indexed: false,
          internalType: "struct LiquidityPool.withdrwalStruct",
          name: "withdrawObj",
          type: "tuple",
        },
      ],
      name: "withdrawalEvent",
      type: "event",
    },
    {
      inputs: [],
      name: "commissionPercentage",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "foreignStakeBalance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "foreignTokenReserve",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_inputAmount",
          type: "uint256",
        },
      ],
      name: "getForeignExchangeAmount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getForeignRate",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_inputAmount",
          type: "uint256",
        },
      ],
      name: "getNativeExchangeAmount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getNativeRate",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "hasStaked",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "isStaking",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "kValue",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "nativeTokenReserve",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "stakeRewards",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "stakers",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalCommissionsEarned",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalForeignStakeBalance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
};
