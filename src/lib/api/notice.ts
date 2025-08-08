import clientPromise from '../mongodb';

// ObjectId
import { ObjectId } from 'mongodb';


export async function createNotice(data: any) {
    if (!data.title || !data.content) {
        return { success: false, message: "Title and content are required." };
    }
    
    const client = await clientPromise;
    const collection = client.db('damoa').collection('notices');
    
    const newNotice = {
        title: data.title,
        content: data.content,
        createdAt: new Date(),
    };
    
    try {
        const result = await collection.insertOne(newNotice);
        return { success: true, noticeId: result.insertedId };
    } catch (error) {
        console.error("Error creating notice:", error);
        return { success: false, message: "Failed to create notice." };
    }
}


export async function deleteNotice(objectId: string) {
    if (!objectId) {
        return { success: false, message: "Notice ID is required." };
    }
    const client = await clientPromise;
    const collection = client.db('damoa').collection('notices');
    try {
        const result = await collection.deleteOne({ _id: new ObjectId(objectId) });
        if (result.deletedCount === 0) {
            return { success: false, message: "Notice not found." };
        }
        return { success: true };
    } catch (error) {
        console.error("Error deleting notice:", error);
        return { success: false, message: "Failed to delete notice." };
    }
}



export async function getNotices() {
    const client = await clientPromise;
    const collection = client.db('damoa').collection('notices');
    
    try {
        const notices = await collection.find({}).sort({ createdAt: -1 }).toArray();
        return { success: true, notices };
    } catch (error) {
        console.error("Error fetching notices:", error);
        return { success: false, message: "Failed to fetch notices." };
    }
}

export async function getNoticeById(objectId: string) {
    if (!objectId) {
        return { success: false, message: "Notice ID is required." };
    }
    const client = await clientPromise;
    const collection = client.db('damoa').collection('notices');
    try {
        const notice = await collection.findOne({ _id: new ObjectId(objectId) });
        if (!notice) {
            return { success: false, message: "Notice not found." };
        }
        return { success: true, notice };
    } catch (error) {
        console.error("Error fetching notice:", error);
        return { success: false, message: "Failed to fetch notice." };
    }
}



export async function updateNotice(objectId: string, data: any) {
    if (!objectId || !data.title || !data.content) {
        return { success: false, message: "Notice ID, title, and content are required." };
    }
    
    const client = await clientPromise;
    const collection = client.db('damoa').collection('notices');
    
    try {
        const result = await collection.updateOne(
            { _id: new ObjectId(objectId) },
            { $set: { title: data.title, content: data.content, updatedAt: new Date() } }
        );
        
        if (result.modifiedCount === 0) {
            return { success: false, message: "Notice not found or no changes made." };
        }
        
        return { success: true };
    } catch (error) {
        console.error("Error updating notice:", error);
        return { success: false, message: "Failed to update notice." };
    }
}





// deleteNoticeById
export async function deleteNoticeById(objectId: string) {
    if (!objectId) {
        return { success: false, message: "Notice ID is required." };
    }
    
    const client = await clientPromise;
    const collection = client.db('damoa').collection('notices');
    
    try {
        const result = await collection.deleteOne({ _id: new ObjectId(objectId) });
        
        if (result.deletedCount === 0) {
            return { success: false, message: "Notice not found." };
        }
        
        return { success: true };
    } catch (error) {
        console.error("Error deleting notice:", error);
        return { success: false, message: "Failed to delete notice." };
    }
}



