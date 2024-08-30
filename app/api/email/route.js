import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from 'next/server';

// Connect to the database
const LoadDB = async () => {
  await ConnectDB();
};
LoadDB();

// API endpoint for subscribing an email
export async function POST(request) {
  console.log("first")
  try {
    const formData = await request.formData();
    const email = formData.get('email');
    console.log("first",email)
    if (!email) {
      return NextResponse.json({ success: false, msg: 'Email is required' }, { status: 400 });
    }

    await EmailModel.create({ email });
    console.log("Email subscribed");

    return NextResponse.json({ success: true, msg: 'Email subscribed successfully' });
  } catch (error) {
    console.error('Error subscribing email:', error);

    if (error instanceof SyntaxError) {
      return NextResponse.json({ success: false, msg: 'Invalid form data' }, { status: 400 });
    }

    return NextResponse.json({ success: false, msg: 'Email subscription failed' }, { status: 500 });
  }
}

// API endpoint to get all emails or a specific email by ID
export async function GET(request) {
  try {
    const emailId = request.nextUrl.searchParams.get("id");
    if (emailId) {
      const email = await EmailModel.findById(emailId);
      if (!email) {
        return NextResponse.json({ msg: "Email not found" }, { status: 404 });
      }
      return NextResponse.json(email);
    } else {
      const emails = await EmailModel.find({});
      return NextResponse.json({ emails });
    }
  } catch (error) {
    console.error('Error fetching emails:', error);
    return NextResponse.json({ msg: "Server Error" }, { status: 500 });
  }
}

// API endpoint to delete an email subscription
export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get('_id');
    if (!id) {
      return NextResponse.json({ msg: "No ID provided" }, { status: 400 });
    }

    const email = await EmailModel.findById(id);
    if (!email) {
      return NextResponse.json({ msg: "Email not found" }, { status: 404 });
    }

    await EmailModel.findByIdAndDelete(id);
    return NextResponse.json({ msg: "Email subscription deleted" });
  } catch (error) {
    console.error('Error deleting email:', error);
    return NextResponse.json({ msg: "Server Error" }, { status: 500 });
  }
}
