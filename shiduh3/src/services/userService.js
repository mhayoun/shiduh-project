import { supabase } from '../supabaseClient';

export const userService = {
  async getContactByEmail(email) {
    const { data, error } = await supabase
      .from('Sh_Contact')
      .select('*')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  async createContact(userData) {
    const { data, error } = await supabase
      .from('Sh_Contact')
      .insert([{ ...userData, valid: 0 }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updatePhone(email, phone) {
    const { error } = await supabase
      .from('Sh_Contact')
      .update({ tel: phone, valid: 1 })
      .eq('email', email);

    if (error) throw error;
  }
};