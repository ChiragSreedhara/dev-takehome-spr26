import { NextResponse } from 'next/server';
import dbConnect from "@/lib/dbConnect";
import RequestModel from "@/models/Request";
import { ResponseType } from "@/lib/types/apiResponse";
import { ServerResponseBuilder } from "@/lib/builders/serverResponseBuilder";
import { InputException } from "@/lib/errors/inputExceptions";
import { PAGINATION_PAGE_SIZE } from "@/lib/constants/config";

export async function GET(request: Request) {
  await dbConnect();
  const url = new URL(request.url);
  const status = url.searchParams.get("status");
  const page = parseInt(url.searchParams.get("page") || "1");

  try {
    const filter = status ? { status } : {};

    const requests = await RequestModel.find(filter)
      .sort({ createdDate: -1 }) 
      .skip((page - 1) * PAGINATION_PAGE_SIZE)
      .limit(PAGINATION_PAGE_SIZE);

    return NextResponse.json(requests, { status: 200 });
  } catch  {
    return new ServerResponseBuilder(ResponseType.UNKNOWN_ERROR).build();
  }
}

export async function PUT(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();

    if (!body.requestorName || body.requestorName.length < 3 || body.requestorName.length > 30) {
      throw new Error("Invalid name length");
    }
    if (!body.itemRequested || body.itemRequested.length < 2 || body.itemRequested.length > 100) {
      throw new Error("Invalid item length");
    }

    const newRequest = await RequestModel.create({
      requestorName: body.requestorName,
      itemRequested: body.itemRequested,
      status: "pending", 
      createdDate: new Date(),
      lastEditedDate: new Date(),
    });

    return NextResponse.json(newRequest, { status: 201 });
  } catch (e) {
    if (e instanceof InputException) {
      return new ServerResponseBuilder(ResponseType.INVALID_INPUT).build();
    }
    return new ServerResponseBuilder(ResponseType.UNKNOWN_ERROR).build();
  }
}

export async function PATCH(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      throw new Error("Missing ID or Status");
    }

    const updatedRequest = await RequestModel.findByIdAndUpdate(
      id,
      { 
        status: status, 
        lastEditedDate: new Date() 
      },
      { new: true }
    );

    if (!updatedRequest) {
      return new ServerResponseBuilder(ResponseType.INVALID_INPUT).build();
    }

    return NextResponse.json(updatedRequest, { status: 200 });
  } catch (e) {
    if (e instanceof InputException) {
      return new ServerResponseBuilder(ResponseType.INVALID_INPUT).build();
    }
    return new ServerResponseBuilder(ResponseType.UNKNOWN_ERROR).build();
  }
}