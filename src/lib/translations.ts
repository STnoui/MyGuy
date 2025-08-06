export const translations = {
  en: {
    language: "EN",
    heroTitle: "Your Guy for Sofia's Night",
    heroSubtitle: "Your guy, for your needs!",
    operatingHours: "Operating Hours: 19:30 - 05:30",
    servicesTitle: "What We Do",
    orderButton: "ORDER NOW",
    services: {
      deliveries: {
        title: "Deliveries",
        description: "From non-stop shops, pharmacies, and fast-food places.",
      },
      easypay: {
        title: "EasyPay Top-ups",
        description: "Top up your account via EasyPay with your National ID Number (EGN).",
      },
      parcels: {
        title: "Parcel Services",
        description: "We can send and receive packages for you.",
      },
      flowers: {
        title: "Flower Delivery",
        description: "Surprise someone with a late-night flower delivery.",
      },
    },
  },
  bg: {
    language: "БГ",
    heroTitle: "Твоят нощен доставчик в София",
    heroSubtitle: "Твоят човек, за твоите нужди!",
    operatingHours: "Работно време: 19:30 - 05:30",
    servicesTitle: "Какво предлагаме",
    orderButton: "ПОРЪЧАЙ СЕГА",
    services: {
      deliveries: {
        title: "Доставки",
        description: "От денонощни магазини, аптеки и заведения за бързо хранене.",
      },
      easypay: {
        title: "Зареждане на EasyPay",
        description: "Зареждане на акаунти в EASYPAY с ЕГН.",
      },
      parcels: {
        title: "Пратки",
        description: "Изпращане и получаване на пратки.",
      },
      flowers: {
        title: "Доставка на цветя",
        description: "Доставяне на цветя.",
      },
    },
  },
};

export type Language = keyof typeof translations;