// @flow

const STATUS = {
  CONFIRMING: 'confirming',
  CONFIRMED: 'confirmed',
  WAITING_FOR_SCAN: 'waiting for scan',
  FAILED: 'failed',
}
export type OrderStatusType = $Values<typeof STATUS>

export default {
  STATUS,
}
