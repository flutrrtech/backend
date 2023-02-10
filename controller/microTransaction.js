const CustomerMT = require("../model/microTransaction");
const MtTransactionLog=require("../model/mtTransactionLog")
//add super like
exports.addSuperLike = async (req, res) => {
  try {
    var customerMt = await CustomerMT.findOne({
      cmm_c_unique_id: req.body.unique_id,
    });
    if (customerMt) {
      if (req.body.rewind != "") {
        if (customerMt.cmm_super_like != "") {
          var sum =
            parseInt(customerMt.cmm_super_like) + parseInt(req.body.super_like);
          customerMt.cmm_super_like = sum.toString();
        } else {
          customerMt.cmm_super_like = req.body.super_like;
        }
      }
      if (req.body.super_like_for_trn_id) {
        customerMt.cmm_super_like_for_trn_id = req.body.super_like_for_trn_id;
      }
      await customerMt.save();
      return res.status(200).json({
        status: 1,
        message: "Data added successfully",
      });
    } else {
      var customerMt = new CustomerMT();
      customerMt.cmm_c_unique_id = req.body.unique_id;
      if (req.body.super_like != "") {
        console.log("hi");
        customerMt.cmm_super_like = req.body.super_like;
      }
      if (req.body.super_like_for_trn_id) {
        customerMt.cmm_super_like_for_trn_id = req.body.super_like_for_trn_id;
      }
      await customerMt.save();
      return res.status(200).json({
        status: 1,
        message: "Data added successfully",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: err.message,
    });
  }
};
//add like
exports.addLike = async (req, res) => {
  try {
    var customerMt = await CustomerMT.findOne({
      cmm_c_unique_id: req.body.unique_id,
    });
    if (customerMt) {
      if (req.body.super_like != "") {
        if (customerMt.like && customerMt.like != "") {
          var sum = parseInt(customerMt.cmm_like) + parseInt(req.body.like);
          customerMt.cmm_like = sum.toString();
        } else {
          customerMt.cmm_like = req.body.like;
        }
      }
      if (req.body.like_for_trn_id) {
        customerMt.cmm_like_for_trn_id = req.body.like_for_trn_id;
      }
      await customerMt.save();
      return res.status(200).json({
        status: 1,
        message: "Data added successfully",
      });
    } else {
      var customerMt = new CustomerMT();
      customerMt.cmm_c_unique_id = req.body.unique_id;
      if (req.body.like != "") {
        customerMt.cmm_like = req.body.like;
      }
      if (req.body.like_for_trn_id) {
        customerMt.cmm_like_for_trn_id = req.body.like_for_trn_id;
      }
      await customerMt.save();
      return res.status(200).json({
        status: 1,
        message: "Data added successfully",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: err.message,
    });
  }
};
//fetch mt
exports.fetchMt = async (req, res) => {
  try {
    var mtData = await CustomerMT.findOne({
      cmm_c_unique_id: req.body.unique_id,
    });
    if (mtData) {
      return res.status(200).json({
        status: 1,
        message: "MT data fetched successfelly",
        data: mtData,
      });
    } else {
      return res.status(200).json({
        status: 0,
        message: "MT data not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: err.message,
    });
  }
};
//remove free like
exports.removeFreeLike = async (req, res) => {
  try {
    var customerMt = await CustomerMT.findOne({
      cmm_c_unique_id: req.body.unique_id,
    });
    if (customerMt) {
      if (req.body.like_remove != "") {
        if (customerMt.cmm_free_like && customerMt.cmm_free_like != "") {
          var sum =
            parseInt(customerMt.cmm_free_like) - parseInt(req.body.like_remove);
          customerMt.cmm_free_like = sum.toString();
        }
      }
      await customerMt.save();
      return res.status(200).json({
        status: 1,
        message: "Data added successfully",
      });
    } else {
      return res.status(200).json({
        status: 0,
        message: "No Records Found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: err.message,
    });
  }
};
//remove free super like
exports.removeFreeSuperLike = async (req, res) => {
  try {
    var customerMt = await CustomerMT.findOne({
      cmm_c_unique_id: req.body.unique_id,
    });
    if (customerMt) {
      if (req.body.super_like_remove != "") {
        if (
          customerMt.cmm_free_super_like &&
          customerMt.cmm_free_super_like != ""
        ) {
          var sum =
            parseInt(customerMt.cmm_super_free_like) -
            parseInt(req.body.super_like_remove);
          customerMt.cmm_free_super_like = sum.toString();
        }
      }
      await customerMt.save();
      return res.status(200).json({
        status: 1,
        message: "Data added successfully",
      });
    } else {
      return res.status(200).json({
        status: 0,
        message: "No Records Found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: err.message,
    });
  }
};

//remove paid like
exports.removePaidLike = async (req, res) => {
  try {
    var customerMt = await CustomerMT.findOne({
      cmm_c_unique_id: req.body.unique_id,
    });
    if (customerMt) {
      if (req.body.like_remove != "") {
        if (customerMt.cmm_like && customerMt.cmm_like != "") {
          var sum =
            parseInt(customerMt.cmm_like) - parseInt(req.body.like_remove);
          customerMt.cmm_like = sum.toString();
        }
      }
      await customerMt.save();
      return res.status(200).json({
        status: 1,
        message: "Data removed successfully",
      });
    } else {
      return res.status(200).json({
        status: 0,
        message: "No Records Found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: err.message,
    });
  }
};
//remove paid super like
exports.removePaidSuperLike = async (req, res) => {
  try {
    var customerMt = await CustomerMT.findOne({
      cmm_c_unique_id: req.body.unique_id,
    });
    if (customerMt) {
      if (req.body.super_like_remove != "") {
        if (customerMt.cmm_super_like && customerMt.cmm_super_like != "") {
          var sum =
            parseInt(customerMt.cmm_super_like) -
            parseInt(req.body.super_like_remove);
          customerMt.cmm_super_like = sum.toString();
        }
      }
      await customerMt.save();
      return res.status(200).json({
        status: 1,
        message: "Data removed successfully",
      });
    } else {
      return res.status(200).json({
        status: 0,
        message: "No Records Found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: err.message,
    });
  }
};

//add paid rewind

exports.addPaidRewind = async (req, res) => {
  try {
    var customerMt = await CustomerMT.findOne({
      cmm_c_unique_id: req.body.unique_id,
    });
    if (customerMt) {
      if (req.body.rewind != "") {
        if (customerMt.cmm_rewind && customerMt.cmm_rewind != "") {
          var sum = parseInt(customerMt.cmm_rewind) + parseInt(req.body.rewind);
          customerMt.cmm_rewind = sum.toString();
        } else {
          customerMt.cmm_rewind = req.body.rewind;
        }
      }
      if (req.body.rewind_for_trn_id) {
        customerMt.cmm_rewind_for_trn_id = req.body.rewind_for_trn_id;
      }
      await customerMt.save();
      return res.status(200).json({
        status: 1,
        message: "Data added successfully",
      });
    } else {
      var customerMt = new CustomerMT();
      customerMt.cmm_c_unique_id = req.body.unique_id;
      if (req.body.rewind != "") {
        customerMt.cmm_rewind = req.body.rewind;
      }
      if (req.body.rewind_for_trn_id) {
        customerMt.cmm_rewind_for_trn_id = req.body.rewind_for_trn_id;
      }
      await customerMt.save();
      return res.status(200).json({
        status: 1,
        message: "Data added successfully",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: err.message,
    });
  }
};
//remove paid rewind

exports.removePaidRewind = async (req, res) => {
  try {
    var customerMt = await CustomerMT.findOne({
      cmm_c_unique_id: req.body.unique_id,
    });
    if (customerMt) {
      if (req.body.rewind_remove != "") {
        if (customerMt.cmm_rewind && customerMt.cmm_rewind != "") {
          var sum =
            parseInt(customerMt.cmm_rewind) - parseInt(req.body.rewind_remove);
          customerMt.cmm_rewind = sum.toString();
        }
      }
      await customerMt.save();
      return res.status(200).json({
        status: 1,
        message: "Data removed successfully",
      });
    } else {
      return res.status(200).json({
        status: 0,
        message: "No Records Found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: err.message,
    });
  }
};

//remove free rewind
exports.removeFreeRewind = async (req, res) => {
  try {
    var customerMt = await CustomerMT.findOne({
      cmm_c_unique_id: req.body.unique_id,
    });
    if (customerMt) {
      if (req.body.rewind_remove != "") {
        if (customerMt.cmm_free_rewind && customerMt.cmm_free_rewind != "") {
          var sum =
            parseInt(customerMt.cmm_free_rewind) -
            parseInt(req.body.rewind_remove);
          customerMt.cmm_free_rewind = sum.toString();
        }
      }
      await customerMt.save();
      return res.status(200).json({
        status: 1,
        message: "Data added successfully",
      });
    } else {
      return res.status(200).json({
        status: 0,
        message: "No Records Found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: err.message,
    });
  }
};

//add audio remaining time
exports.addAudioTime = async (req, res) => {
  try {
    var customerMt = await CustomerMT.findOne({
      cmm_c_unique_id: req.body.unique_id,
    });
    if (customerMt) {
      if (req.body.remaining_time != "") {
        customerMt.cmm_audio_remaining_time = req.body.remaining_time;

        if (req.body.audio_for_trn_id) {
          customerMt.cmm_audio_for_trn_id = req.body.audio_for_trn_id;
        }
        await customerMt.save();
        return res.status(200).json({
          status: 1,
          message: "Data added successfully",
        });
      } else {
        var customerMt = new CustomerMT();
        customerMt.cmm_c_unique_id = req.body.unique_id;
        if (req.body.remaining_time != "") {
          customerMt.cmm_audio_remaining_time = req.body.remaining_time;

          if (req.body.audio_for_trn_id) {
            customerMt.cmm_audio_for_trn_id = req.body.audio_for_trn_id;
          }

          await customerMt.save();
          return res.status(200).json({
            status: 1,
            message: "Data added successfully",
          });
        }
      }
    }
  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: err.message,
    });
  }
};

//add video remaining time
exports.addVideoTime = async (req, res) => {
  try {
    var customerMt = await CustomerMT.findOne({
      cmm_c_unique_id: req.body.unique_id,
    });
    if (customerMt) {
      if (req.body.remaining_time != "") {
        customerMt.cmm_video_remaining_time = req.body.remaining_time;

        if (req.body.video_for_trn_id) {
          customerMt.cmm_video_for_trn_id = req.body.video_for_trn_id;
        }
        await customerMt.save();
        return res.status(200).json({
          status: 1,
          message: "Data added successfully",
        });
      } else {
        var customerMt = new CustomerMT();
        customerMt.cmm_c_unique_id = req.body.unique_id;
        if (req.body.remaining_time != "") {
          customerMt.cmm_video_remaining_time = req.body.remaining_time;

          if (req.body.video_for_trn_id) {
            customerMt.cmm_video_for_trn_id = req.body.video_for_trn_id;
          }

          await customerMt.save();
          return res.status(200).json({
            status: 1,
            message: "Data added successfully",
          });
        }
      }
    }
  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: err.message,
    });
  }
};

//add boost

exports.addBoost = async (req, res) => {
  try {
    var customerMt = await CustomerMT.findOne({
      cmm_c_unique_id: req.body.unique_id,
    });
    if (customerMt) {
      if (req.body.boost != "") {
        customerMt.cmm_boost = req.body.boost;
      }
      if (req.body.boost_end != "") {
        customerMt.cmm_boost_end = req.body.boost_end;
      }
      if (req.body.boost_for_trn_id) {
        customerMt.cmm_boost_for_trn_id = req.body.boost_for_trn_id;
      }
      await customerMt.save();
      return res.status(200).json({
        status: 1,
        message: "Data added successfully",
      });
    } else {
      var customerMt = new CustomerMT();
      customerMt.cmm_c_unique_id = req.body.unique_id;
      if (req.body.boost != "") {
        customerMt.cmm_boost = req.body.boost;
      }
      if (req.body.boost_end != "") {
        customerMt.cmm_boost_end = req.body.boost_end;
      }
      if (req.body.boost_for_trn_id) {
        customerMt.cmm_boost_for_trn_id = req.body.boost_for_trn_id;
      }
      await customerMt.save();
      return res.status(200).json({
        status: 1,
        message: "Data added successfully",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 0,
      message: err.message,
    });
  }
};
