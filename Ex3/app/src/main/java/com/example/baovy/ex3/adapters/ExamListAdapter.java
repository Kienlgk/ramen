package com.example.baovy.ex3.adapters;

import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.baovy.ex3.Exam;
import com.example.baovy.ex3.R;

public class ExamListAdapter extends RecyclerView.Adapter<ExamListAdapter.ViewHolder> {
    private Exam mExam;

    public static class ViewHolder extends RecyclerView.ViewHolder {
        public TextView mTenMhTextView;
        public TextView mNhomToTextView;
        public TextView mThiGkTextView;
        public TextView mThiCkTextView;

        public ViewHolder(View v) {
            super(v);

            mTenMhTextView = (TextView) v.findViewById(R.id.fragment_exam_viewholder_ten_mh_text_view);
            mNhomToTextView = (TextView) v.findViewById(R.id.fragment_exam_viewholder_nhomto_text_view);
            mThiGkTextView = (TextView) v.findViewById(R.id.fragment_exam_viewholder_thi_gk_text_view);
            mThiCkTextView = (TextView) v.findViewById(R.id.fragment_exam_viewholder_thi_ck_text_view);
        }
    }

    public ExamListAdapter(Exam exam) {
        this.mExam = exam;
    }

    public void changeExam(Exam exam) {
        this.mExam = exam;
        notifyDataSetChanged();
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.fragment_exam_viewholder, parent, false);

        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        String maMh = mExam.getLichthi().get(position).getMa_mh();
        holder.mTenMhTextView.setText(maMh + " - " + mExam.getLichthi().get(position).getTen_mh());
        holder.mNhomToTextView.setText(mExam.getLichthi().get(position).getNhomto());

        String thiGkString;
        if (mExam.getLichthi().get(position).getGio_kt() == null) {
            thiGkString = "không";
        } else {
            thiGkString = mExam.getLichthi().get(position).getGio_kt() + " ngày " + mExam.getLichthi().get(position).getNgaykt() + " - Phòng " + mExam.getLichthi().get(position).getPhong_ktra();
        }
        holder.mThiGkTextView.setText(thiGkString);

        String thiCkString = mExam.getLichthi().get(position).getGio_thi() + " ngày " + mExam.getLichthi().get(position).getNgaythi() + " - Phòng " + mExam.getLichthi().get(position).getPhong_thi();
        holder.mThiCkTextView.setText(thiCkString);
    }

    @Override
    public int getItemCount() {
        return mExam.getLichthi().size();
    }
}
