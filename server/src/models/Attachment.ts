import knexPg from '../db';

class Attachment {
  attachment_id?: number;
  attachment_type: string;
  attachment_mimetype: string;
  attachment_name: string;
  attachment_description: string;
  created_by: string;

  constructor(
    attachmentType: string,
    attachmentMimetype: string,
    attachmentName: string,
    attachmentDescription: string,
    createdBy: string
  ) {
    this.attachment_type = attachmentType;
    this.attachment_mimetype = attachmentMimetype;
    this.attachment_name = attachmentName;
    this.attachment_description = attachmentDescription;
    this.created_by = createdBy;
  }

  async save(): Promise<Attachment> {
    try {
      const savedAttachmentRows = await knexPg<Attachment>('attachment')
        .insert({
          attachment_type: this.attachment_type,
          attachment_mimetype: this.attachment_mimetype,
          attachment_name: this.attachment_name,
          attachment_description: this.attachment_description,
          created_by: this.created_by,
        })
        .returning('*');
      return savedAttachmentRows[0];
    } catch (err) {
      throw new Error(err);
    }
  }

  static async findOne(createdBy: string, attachmentType: string): Promise<Attachment | undefined> {
    try {
      const attachment: Attachment | undefined = await knexPg<Attachment>(
        'attachment'
      )
        .select('*')
        .where({
          created_by: createdBy,
          attachment_type: attachmentType,
        })
        .first();
      return attachment;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async delete(attachmentName: string): Promise<void> {
    try {
      await knexPg<Attachment>('attachment')
        .where({
          attachment_name: attachmentName,
        })
        .del();
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default Attachment;
