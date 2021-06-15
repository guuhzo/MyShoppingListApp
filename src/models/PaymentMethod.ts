export default interface IPaymentMethod {
  _id: string;
  type: 'cash' | 'ticket' | 'other';
  isEditable: boolean;
  value: number;
}