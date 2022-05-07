import { IVehicleDashboard } from 'models/vehicles';
import React, { Dispatch, SetStateAction } from 'react';
import { ITableColumns } from 'models/table';
import { FilterInput } from 'widgets/Table/FilterFields/FilterInput';
import { colors } from 'styles/colors';
import { EInputTypes } from 'models/forms';
import { RangeInput } from 'widgets/Table/FilterFields/RangeInput';
import { ECurrency } from 'models/currency';
import { NavLink } from 'ui/NavLink';
import { ERouteLinks } from 'models/route';
import { IVehicleFilters } from 'pages/VehiclesPage/types';
import { getVehicleStatus, vehicleStatusOptions } from 'helpers/vehicles';
import { SelectInput } from 'widgets/Table/FilterFields/SelectInput';

export const vehiclesColumns: ITableColumns[] = [
  {
    id: 'c5497b6b-853f-4839-a15b-4e4be770f97c',
    key: 'stockId',
    title: 'Stock ID',
  },
  {
    id: '5dccfe3a-fb01-4bc7-802f-ed735db267c3',
    key: 'registration',
    title: 'VRM',
    render: (text, props) => (
      <NavLink
        color={colors.primary}
        to={`${ERouteLinks.vehicleDetails}/${props.id}` as unknown as ERouteLinks}
      >
        {text}
      </NavLink>
    ),
  },
  {
    id: '3ed8b605-72bf-47de-92bf-b9c9ae441a81',
    key: 'make',
    title: 'Make',
  },
  {
    id: 'f0958da4-a625-4381-acfe-fa7d0b606e4d',
    key: 'model',
    title: 'Model',
  },
  {
    id: 'ebaac11c-0804-4248-8cef-74fa017e6848',
    key: 'variant',
    title: 'Variant',
  },
  {
    id: 'd1207a5e-cacd-4d57-9ab8-ed0763f62c65',
    key: 'mileage',
    title: 'Mileage',
  },
  {
    id: 'a0f91882-c79b-4678-a62e-bfd55a977a38',
    key: 'daysInStock',
    title: 'Days in Stock',
  },
  {
    id: 'c9e27d38-0e94-4632-befa-675812a6e857',
    key: 'price',
    title: 'Price',
  },
  {
    id: '9f789216-8ec8-4616-bf80-e5788045fea7',
    key: 'status',
    title: 'Status',
  },
];

export const getVehiclesColumns = (
  setFilters: Dispatch<SetStateAction<IVehicleFilters>>,
): ITableColumns[] => [
  {
    id: 'c5497b6b-853f-4839-a15b-4e4be770f97c',
    key: 'stockId',
    title: 'Stock ID',
    filterRender: () => (
      <FilterInput
        color={colors.primary}
        onChange={(value) => {
          setFilters((prev) => ({
            ...prev,
            stockId: value,
          }));
        }}
        name="stockId"
        type={EInputTypes.search}
      />
    ),
    width: '75px',
  },
  {
    id: '5dccfe3a-fb01-4bc7-802f-ed735db267c3',
    key: 'registration',
    title: 'VRM',
    render: (text, props) => (
      <NavLink
        color={colors.primary}
        to={`${ERouteLinks.vehicleDetails}/${props.id}` as unknown as ERouteLinks}
      >
        {text}
      </NavLink>
    ),
    filterRender: () => (
      <FilterInput
        color={colors.primary}
        onChange={(value) => {
          setFilters((prev) => ({
            ...prev,
            registration: value,
          }));
        }}
        name="registration"
        type={EInputTypes.search}
      />
    ),
    width: '100px',
  },
  {
    id: '3ed8b605-72bf-47de-92bf-b9c9ae441a81',
    key: 'make',
    title: 'Make',
    filterRender: () => (
      <FilterInput
        color={colors.primary}
        onChange={(value) => {
          setFilters((prev) => ({
            ...prev,
            make: value,
          }));
        }}
        name="make"
        type={EInputTypes.search}
      />
    ),
    width: '90px',
  },
  {
    id: 'f0958da4-a625-4381-acfe-fa7d0b606e4d',
    key: 'model',
    title: 'Model',
    filterRender: () => (
      <FilterInput
        color={colors.primary}
        onChange={(value) => {
          setFilters((prev) => ({
            ...prev,
            model: value,
          }));
        }}
        name="model"
        type={EInputTypes.search}
      />
    ),
    width: '100px',
  },
  {
    id: 'ebaac11c-0804-4248-8cef-74fa017e6848',
    key: 'modelVariant',
    title: 'Variant',
    filterRender: () => (
      <FilterInput
        color={colors.primary}
        onChange={(value) => {
          setFilters((prev) => ({
            ...prev,
            modelVariant: value,
          }));
        }}
        name="modelVariant"
        type={EInputTypes.search}
      />
    ),
    width: '150px',
  },
  {
    id: 'd1207a5e-cacd-4d57-9ab8-ed0763f62c65',
    key: 'mileage',
    title: 'Mileage',
    filterRender: () => (
      <RangeInput
        color={colors.primary}
        onChange={(value, key) => {
          setFilters((prev) => ({
            ...prev,
            [key]: value,
          }));
        }}
        name="mileage"
      />
    ),
    width: '135px',
  },
  {
    id: 'a0f91882-c79b-4678-a62e-bfd55a977a38',
    key: 'daysInStock',
    title: 'DIS',
    filterRender: () => (
      <FilterInput
        color={colors.primary}
        onChange={(value) => {
          setFilters((prev) => ({
            ...prev,
            daysInStock: value as any,
          }));
        }}
        name="daysInStock"
        type={EInputTypes.search}
      />
    ),
    width: '60px',
  },
  {
    id: 'c9e27d38-0e94-4632-befa-675812a6e857',
    key: 'price',
    title: 'Price',
    render: (value) => (!value ? '' : `${ECurrency.pound}${value}`),
    filterRender: () => (
      <RangeInput
        color={colors.primary}
        onChange={(value, key) => {
          setFilters((prev) => ({
            ...prev,
            [key]: value,
          }));
        }}
        name="price"
      />
    ),
    width: '135px',
  },
  {
    id: '9f789216-8ec8-4616-bf80-e5788045fea7',
    key: 'status',
    title: 'Status',
    render: (_, props) => getVehicleStatus(props.sold, props.advertise),
    filterRender: () => (
      <SelectInput
        color={colors.primary}
        onChange={(option) => {
          setFilters((prev) => {
            const result = { ...prev };
            delete result.advertised;
            delete result.sold;
            switch (option.value) {
              case 'advertise':
                return { ...result, advertised: true };
              case 'notAdvertise':
                return { ...result, advertised: false };
              case 'sold':
                return { ...result, sold: true };
              default:
                return result;
            }
          });
        }}
        options={vehicleStatusOptions}
        name="status"
      />
    ),
  },
];

export const mapVehicles = (vehicles: IVehicleDashboard[]) =>
  vehicles.map((vehicle: IVehicleDashboard) => ({
    ...vehicle,
    make: vehicle?.make?.name ? vehicle.make.name : vehicle.make,
    model: vehicle?.model?.name ? vehicle.model.name : vehicle.model,
  }));
