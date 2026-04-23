export const validateBookDescriptionRule = (_: unknown, value: string) => {
  const trimmedValue = value?.trim?.() ?? '';

  if (!trimmedValue) {
    return Promise.reject(new Error('Описание книги не может быть пустым'));
  }

  const regex = /^[a-zA-Zа-яА-ЯёЁ.,;:!?'"«»()\-[\]\s]+$/;

  if (!regex.test(trimmedValue)) {
    return Promise.reject(
      new Error(
        'Описание должно состоять только из букв русского/латинского алфавита и знаков препинания'
      )
    );
  }

  return Promise.resolve();
};

export const formatDate = (value: string): string => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '—';
  }

  return date.toLocaleDateString('ru-RU');
};
