const validateAddress = (value: string) => value && !/^\s*$/.test(value.trim());

export default validateAddress;
