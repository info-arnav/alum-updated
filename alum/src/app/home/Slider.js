"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";

// import { StarIcon } from '@heroicons/react/24/solid';

const Slider = (props) => {
  return (
    <Card
      color="white"
      shadow={false}
      className="w-full max-w-[26rem] justift-center mx-auto p-2"
    >
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="mx-0 flex items-center gap-4 pt-0 pb-8"
      >
        <Avatar
          size="lg"
          variant="circular"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          alt="candice wu"
        />
        <div className="flex w-full flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
              {props.info.name}
            </Typography>
            {/* <div className="5 flex items-center gap-0">
              <StarIcon className="h-5 w-5 text-yellow-700" />
              <StarIcon className="h-5 w-5 text-yellow-700" />
              <StarIcon className="h-5 w-5 text-yellow-700" />
              <StarIcon className="h-5 w-5 text-yellow-700" />
              <StarIcon className="h-5 w-5 text-yellow-700" />
            </div> */}
          </div>
          <Typography color="blue-gray">{props.info.desc}</Typography>
        </div>
      </CardHeader>
      <CardBody className="mb-6 p-0">
        <Typography>&quot;{props.info.desc}&quot;</Typography>
      </CardBody>
    </Card>

    // <div className="flex flex-row mx-auto">
    //   <div className="relative h-1/2 w-1/2">
    //     <img
    //       src={props.info.image}
    //       alt="image 1"
    //       className="h-full w-full object-cover"
    //     />
    //     <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
    //       <div className="w-3/4 text-center md:w-2/4">
    //         <Typography
    //           variant="h1"
    //           color="white"
    //           className="mb-4 text-3xl md:text-4xl lg:text-5xl"
    //         >
    //           {props.info.name}
    //         </Typography>
    //         <Typography
    //           variant="lead"
    //           color="white"
    //           className="mb-12 opacity-80"
    //         >
    //           {props.info.desc}
    //         </Typography>
    //       </div>
    //     </div>
    //   </div>
  );
};

export default Slider;
