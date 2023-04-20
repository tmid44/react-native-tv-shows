export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    uuid: string;
  }

export interface Show {
id: number;
title: string;
description: string;
duration_minutes: number;
uuid: string;
}

export interface Adv {
id: number;
product: string;
audience: string;
budget: number;
duration_minutes: number;
uuid: string;
}
